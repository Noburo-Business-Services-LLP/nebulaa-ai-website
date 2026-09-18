import { google } from 'googleapis'
import { SITE_BASE } from '@/app/sitemap'
import { agents } from '@/lib/productData'

/**
 * Google Search Console, via a service account — the real replacement for
 * the "2 of 10 discovered pages indexed" screenshot finding in the handoff
 * brief. Gated the same way every other optional integration in this repo
 * is: blank env vars means the feature reports itself as not configured,
 * nothing throws.
 *
 * GSC_PROPERTY defaults to the domain-property form (sc-domain:nebulaa.ai),
 * which is what a property verified at the domain level (rather than a
 * specific https://www.… prefix) uses as its siteUrl — overridable via env
 * var in case the actual GSC property turns out to be a URL-prefix one.
 */

function isConfigured() {
  return Boolean(process.env.GSC_CLIENT_EMAIL && process.env.GSC_PRIVATE_KEY)
}

function getAuthClient() {
  const email = process.env.GSC_CLIENT_EMAIL
  const key = process.env.GSC_PRIVATE_KEY?.replace(/\\n/g, '\n')
  if (!email || !key) return null

  return new google.auth.JWT({
    email,
    key,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  })
}

function property() {
  return process.env.GSC_PROPERTY || 'sc-domain:nebulaa.ai'
}

/**
 * The URL Inspection API answers one URL per call and, measured directly
 * against this property, takes roughly 10 seconds per call — not a rate
 * limit, just how slow the endpoint itself is. Checking all ~130 sitemap
 * pages sequentially would take 20+ minutes, which is unusable as an
 * on-demand dashboard action and would blow any reasonable request
 * timeout well before finishing. This checks the ~14 highest-value hub and
 * product pages instead (the ones sitemap.ts weights at priority >= 0.85),
 * which finishes in a couple of minutes — a deliberate scope-down, not an
 * oversight; full-site coverage of "is this indexed" belongs in Search
 * Console's own UI, which has already surfaced the real number (2 of 10).
 */
function priorityPaths(): string[] {
  return ['', '/pricing', '/services', '/product', '/channels', '/work', '/for', '/tools', '/blog', '/resources', '/compare', ...Object.keys(agents).map(id => `/product/${id}`)]
}

export interface IndexingResult {
  configured: boolean
  error: string | null
  totalChecked: number
  indexed: number
  notIndexed: number
  pages: { path: string; verdict: string; coverageState: string | null }[]
}

/**
 * Calls the URL Inspection API once per sitemap page — the only GSC
 * endpoint that answers "is this specific URL indexed," which is not the
 * same question the (unqueryable-via-API) Index Coverage report in the UI
 * answers, but is the closest live equivalent.
 */
export async function getIndexingStatus(): Promise<IndexingResult> {
  if (!isConfigured()) {
    return { configured: false, error: null, totalChecked: 0, indexed: 0, notIndexed: 0, pages: [] }
  }

  const auth = getAuthClient()
  if (!auth) return { configured: false, error: null, totalChecked: 0, indexed: 0, notIndexed: 0, pages: [] }

  const searchconsole = google.searchconsole({ version: 'v1', auth })
  const paths = priorityPaths()
  const results: IndexingResult['pages'] = []

  try {
    // Sequential, not concurrent — the URL Inspection API has a tight
    // per-minute quota (600/site/day is generous, but per-minute bursts get
    // throttled), unlike a page fetch this is a metered Google API call.
    for (const path of paths) {
      const url = `${SITE_BASE}${path}`
      try {
        const res = await searchconsole.urlInspection.index.inspect({
          requestBody: { inspectionUrl: url, siteUrl: property() },
        })
        const verdict = res.data.inspectionResult?.indexStatusResult?.verdict ?? 'UNKNOWN'
        const coverageState = res.data.inspectionResult?.indexStatusResult?.coverageState ?? null
        results.push({ path, verdict, coverageState })
      } catch (e) {
        results.push({ path, verdict: 'ERROR', coverageState: e instanceof Error ? e.message : 'Inspection failed' })
      }
    }
  } catch (e) {
    return {
      configured: true,
      error: e instanceof Error ? e.message : 'Search Console request failed',
      totalChecked: 0,
      indexed: 0,
      notIndexed: 0,
      pages: [],
    }
  }

  const indexed = results.filter(r => r.verdict === 'PASS').length

  return {
    configured: true,
    error: null,
    totalChecked: results.length,
    indexed,
    notIndexed: results.length - indexed,
    pages: results,
  }
}

export interface QueryPerformance {
  query: string
  clicks: number
  impressions: number
  ctr: number
  position: number
}

export interface SearchPerformance {
  configured: boolean
  error: string | null
  totalClicks: number
  totalImpressions: number
  topQueries: QueryPerformance[]
  pageClicks: { path: string; clicks: number; impressions: number }[]
}

/** Last 28 days of clicks/impressions — by query and by page. */
export async function getSearchPerformance(): Promise<SearchPerformance> {
  if (!isConfigured()) {
    return { configured: false, error: null, totalClicks: 0, totalImpressions: 0, topQueries: [], pageClicks: [] }
  }

  const auth = getAuthClient()
  if (!auth) return { configured: false, error: null, totalClicks: 0, totalImpressions: 0, topQueries: [], pageClicks: [] }

  const searchconsole = google.searchconsole({ version: 'v1', auth })
  const endDate = new Date().toISOString().slice(0, 10)
  const startDate = new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)

  try {
    const [byQuery, byPage] = await Promise.all([
      searchconsole.searchanalytics.query({
        siteUrl: property(),
        requestBody: { startDate, endDate, dimensions: ['query'], rowLimit: 25 },
      }),
      searchconsole.searchanalytics.query({
        siteUrl: property(),
        requestBody: { startDate, endDate, dimensions: ['page'], rowLimit: 250 },
      }),
    ])

    const topQueries: QueryPerformance[] = (byQuery.data.rows ?? []).map(r => ({
      query: r.keys?.[0] ?? '',
      clicks: r.clicks ?? 0,
      impressions: r.impressions ?? 0,
      ctr: r.ctr ?? 0,
      position: r.position ?? 0,
    }))

    const pageClicks = (byPage.data.rows ?? []).map(r => ({
      path: (r.keys?.[0] ?? '').replace(SITE_BASE, '') || '/',
      clicks: r.clicks ?? 0,
      impressions: r.impressions ?? 0,
    }))

    return {
      configured: true,
      error: null,
      totalClicks: pageClicks.reduce((s, p) => s + p.clicks, 0),
      totalImpressions: pageClicks.reduce((s, p) => s + p.impressions, 0),
      topQueries,
      pageClicks,
    }
  } catch (e) {
    return {
      configured: true,
      error: e instanceof Error ? e.message : 'Search Console request failed',
      totalClicks: 0,
      totalImpressions: 0,
      topQueries: [],
      pageClicks: [],
    }
  }
}
