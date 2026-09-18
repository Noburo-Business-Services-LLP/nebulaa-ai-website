import * as cheerio from 'cheerio'
import { getSitePaths, SITE_BASE } from '@/app/sitemap'
import { readJson, writeJson } from '@/lib/s3Store'

/**
 * On-page SEO audit — crawls every URL the site's own sitemap lists (see
 * getSitePaths in app/sitemap.ts, the single source of truth for "how many
 * pages does the site have") and checks the things Google actually looks
 * at: title, meta description, canonical tag, image alt coverage, heading
 * structure. No external API — this is the "free stuff first" phase from
 * the handoff brief, run against the live site so what it reports is what
 * a crawler actually sees, not what the source data merely intends.
 */

export interface PageAudit {
  path: string
  url: string
  status: number | null
  error: string | null
  title: string | null
  titleLength: number
  metaDescription: string | null
  metaDescriptionLength: number
  canonicalUrl: string | null
  canonicalMatchesWww: boolean
  h1Count: number
  h1Text: string | null
  imageCount: number
  imagesMissingAlt: number
  imagesWithAlt: number
}

export interface AuditSummary {
  runAt: string
  pageCount: number
  pagesFetched: number
  pagesFailed: number
  titleCoverage: number // pages with a title, 0-100
  metaDescriptionCoverage: number
  goodTitleLengthPct: number // 10-60 chars, Google's usual rendered range
  goodMetaLengthPct: number // 70-160 chars
  canonicalWwwConsistency: number // pages whose canonical matches https://www.nebulaa.ai, 0-100
  totalImages: number
  imageAltCoverage: number | null // images with alt / total images, 0-100; null when there are no images to check
  multipleH1Count: number
  missingH1Count: number
  pages: PageAudit[]
}

const AUDIT_KEY = 'seo/audit-latest.json'
const CONCURRENCY = 8
const FETCH_TIMEOUT_MS = 15000

function isGoodTitleLength(len: number) {
  return len >= 10 && len <= 60
}
function isGoodMetaLength(len: number) {
  return len >= 70 && len <= 160
}

async function fetchWithTimeout(url: string): Promise<Response> {
  const controller = new AbortController()
  const t = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
  try {
    return await fetch(url, { signal: controller.signal, headers: { 'User-Agent': 'NebulaaSEOAudit/1.0' } })
  } finally {
    clearTimeout(t)
  }
}

async function auditOnePage(path: string): Promise<PageAudit> {
  const url = `${SITE_BASE}${path}`
  const base: PageAudit = {
    path,
    url,
    status: null,
    error: null,
    title: null,
    titleLength: 0,
    metaDescription: null,
    metaDescriptionLength: 0,
    canonicalUrl: null,
    canonicalMatchesWww: false,
    h1Count: 0,
    h1Text: null,
    imageCount: 0,
    imagesMissingAlt: 0,
    imagesWithAlt: 0,
  }

  try {
    const res = await fetchWithTimeout(url)
    base.status = res.status
    if (!res.ok) {
      base.error = `HTTP ${res.status}`
      return base
    }

    const html = await res.text()
    const $ = cheerio.load(html)

    const title = $('title').first().text().trim()
    base.title = title || null
    base.titleLength = title.length

    const metaDesc = $('meta[name="description"]').attr('content')?.trim() ?? ''
    base.metaDescription = metaDesc || null
    base.metaDescriptionLength = metaDesc.length

    const canonical = $('link[rel="canonical"]').attr('href')?.trim() ?? null
    base.canonicalUrl = canonical
    base.canonicalMatchesWww = Boolean(canonical && canonical.startsWith(SITE_BASE))

    const h1s = $('h1')
    base.h1Count = h1s.length
    base.h1Text = h1s.first().text().trim().slice(0, 200) || null

    const images = $('img')
    base.imageCount = images.length
    images.each((_, el) => {
      const alt = $(el).attr('alt')
      if (alt && alt.trim().length > 0) base.imagesWithAlt++
      else base.imagesMissingAlt++
    })

    return base
  } catch (e) {
    base.error = e instanceof Error ? e.message : 'Fetch failed'
    return base
  }
}

/** Runs `items` through `fn`, `concurrency` at a time, preserving order. */
async function mapLimit<T, R>(items: T[], concurrency: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length)
  let next = 0
  async function worker() {
    while (next < items.length) {
      const i = next++
      results[i] = await fn(items[i])
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, worker))
  return results
}

export async function runAudit(): Promise<AuditSummary> {
  const paths = getSitePaths()
  const pages = await mapLimit(paths, CONCURRENCY, auditOnePage)

  const fetched = pages.filter(p => p.status !== null && p.status < 400)
  const failed = pages.filter(p => p.status === null || p.status >= 400)

  const withTitle = fetched.filter(p => p.title)
  const withMeta = fetched.filter(p => p.metaDescription)
  const goodTitle = fetched.filter(p => isGoodTitleLength(p.titleLength))
  const goodMeta = fetched.filter(p => isGoodMetaLength(p.metaDescriptionLength))
  const canonicalOk = fetched.filter(p => p.canonicalMatchesWww)
  const totalImages = fetched.reduce((s, p) => s + p.imageCount, 0)
  const totalImagesWithAlt = fetched.reduce((s, p) => s + p.imagesWithAlt, 0)

  const summary: AuditSummary = {
    runAt: new Date().toISOString(),
    pageCount: paths.length,
    pagesFetched: fetched.length,
    pagesFailed: failed.length,
    titleCoverage: pct(withTitle.length, fetched.length),
    metaDescriptionCoverage: pct(withMeta.length, fetched.length),
    goodTitleLengthPct: pct(goodTitle.length, fetched.length),
    goodMetaLengthPct: pct(goodMeta.length, fetched.length),
    canonicalWwwConsistency: pct(canonicalOk.length, fetched.length),
    totalImages,
    imageAltCoverage: totalImages === 0 ? null : pct(totalImagesWithAlt, totalImages),
    multipleH1Count: fetched.filter(p => p.h1Count > 1).length,
    missingH1Count: fetched.filter(p => p.h1Count === 0).length,
    pages,
  }

  await writeJson(AUDIT_KEY, summary)
  return summary
}

export async function getLastAudit(): Promise<AuditSummary | null> {
  return readJson<AuditSummary | null>(AUDIT_KEY, null)
}

function pct(part: number, total: number): number {
  if (total === 0) return 0
  return Math.round((part / total) * 100)
}
