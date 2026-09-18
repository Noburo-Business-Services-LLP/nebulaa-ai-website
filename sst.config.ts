/// <reference path="./.sst/platform/config.d.ts" />

/**
 * Nebulaa marketing site — OpenNext on AWS.
 *
 * The 145 prerendered pages and every static asset are uploaded to S3 and
 * served from CloudFront's edge network. Only the nine API routes reach the
 * Lambda server function. A second, private bucket holds mutable state —
 * leads, per-day analytics, newsletter send history, admin-published posts —
 * because the Lambda bundle itself is read-only.
 */
export default $config({
  app(input) {
    return {
      name: 'nebulaa-website',
      // Production keeps its buckets if the stack is ever torn down; the lead
      // list is the one thing here that cannot be regenerated from the repo.
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      protect: input?.stage === 'production',
      home: 'aws',
      providers: {
        aws: { region: 'ap-south-1' },
      },
    }
  },

  async run() {
    // Mutable application state. Private — reached only through the server
    // function, never directly from the internet.
    const data = new sst.aws.Bucket('Data')

    // Public asset store for the CMS media manager. Uploads go straight from
    // the admin's browser to this bucket via a presigned URL — never through
    // the Lambda function, which has a 6MB request/response payload limit
    // that a handful of the video assets here would exceed on their own.
    // Objects are served directly from the bucket's own domain rather than
    // proxied through the app, so there is no per-request Lambda cost or
    // latency for images that used to ship as static files in the repo.
    const media = new sst.aws.Bucket('Media', {
      access: 'public',
      cors: {
        allowOrigins: ['https://www.nebulaa.ai', 'https://nebulaa.ai', 'http://localhost:3000'],
        allowMethods: ['PUT', 'GET', 'HEAD'],
        allowHeaders: ['*'],
      },
    })

    // Time-series metrics (SEO audit runs, and anything else that's a
    // history of snapshots rather than a single current value) — a flat S3
    // JSON blob is the wrong shape for "every run, forever, queryable by
    // time," which is exactly what audit history is. Partition key is the
    // metric stream ("seo-audit"), sort key is the ISO run timestamp, so a
    // single Query gives back the whole trend in order.
    const metrics = new sst.aws.Dynamo('Metrics', {
      fields: { pk: 'string', sk: 'string' },
      primaryIndex: { hashKey: 'pk', rangeKey: 'sk' },
    })

    const site = new sst.aws.Nextjs('Site', {
      link: [data, media, metrics],

      domain: {
        name: 'www.nebulaa.ai',
        // Apex redirects to www rather than serving a second copy, so there is
        // one canonical hostname for search engines and one place to debug.
        redirects: ['nebulaa.ai'],
        // DNS lives at Cloudflare, so SST creates no records — the CNAMEs are
        // added there by hand. A wildcard cert is required rather than a
        // per-host one: `www` is itself a CNAME, and DNS forbids resolving any
        // name beneath a CNAME, so ACM can never read a validation record at
        // `_xxx.www.nebulaa.ai`. Validating `*.nebulaa.ai` at the apex avoids
        // that entirely.
        dns: false,
        cert: 'arn:aws:acm:us-east-1:609665073007:certificate/576ba9ff-7943-40dc-ac4c-b8c37b3ccdb0',
      },

      // One always-live instance. The analytics beacon already keeps the
      // function warm during the day; this covers the quiet hours so the
      // first form submission of the morning doesn't pay a cold start.
      // Deliberately not Provisioned Concurrency, which costs ~$12/month.
      warm: 1,

      environment: {
        DATA_BUCKET: data.name,
        MEDIA_BUCKET: media.name,
        NEXT_PUBLIC_MEDIA_DOMAIN: media.domain,
        METRICS_TABLE: metrics.name,

        // Supplied from the deploy environment. ADMIN_SECRET unset means the
        // admin API refuses every request — see lib/adminAuth.ts.
        ADMIN_SECRET: process.env.ADMIN_SECRET ?? '',
        ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY ?? '',
        SMTP_HOST: process.env.SMTP_HOST ?? '',
        SMTP_PORT: process.env.SMTP_PORT ?? '587',
        SMTP_USER: process.env.SMTP_USER ?? '',
        SMTP_PASS: process.env.SMTP_PASS ?? '',
        SMTP_FROM: process.env.SMTP_FROM ?? '',
        LEADS_NOTIFY_TO: process.env.LEADS_NOTIFY_TO ?? 'hello@nebulaa.ai',

        // Analytics & ads tags — see lib/analytics/config.ts. Blank disables
        // that tag entirely (no script loads, nothing breaks). NEXT_PUBLIC_*
        // vars are inlined at build time, so they must be set in this shell
        // before `sst deploy`, not just in Lambda's runtime env.
        NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID ?? '',
        NEXT_PUBLIC_GA4_ID: process.env.NEXT_PUBLIC_GA4_ID ?? '',
        NEXT_PUBLIC_GOOGLE_ADS_ID: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? '',
        NEXT_PUBLIC_META_PIXEL_ID: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? '',
        META_CAPI_ACCESS_TOKEN: process.env.META_CAPI_ACCESS_TOKEN ?? '',

        // Google Search Console (service account) — see lib/googleSearchConsole.ts.
        // Blank means the SEO dashboard's indexing card reports itself as
        // not configured rather than failing.
        GSC_CLIENT_EMAIL: process.env.GSC_CLIENT_EMAIL ?? '',
        GSC_PRIVATE_KEY: process.env.GSC_PRIVATE_KEY ?? '',
        GSC_PROPERTY: process.env.GSC_PROPERTY ?? '',
      },
    })

    return {
      url: site.url,
      dataBucket: data.name,
      mediaBucket: media.name,
      metricsTable: metrics.name,
    }
  },
})
