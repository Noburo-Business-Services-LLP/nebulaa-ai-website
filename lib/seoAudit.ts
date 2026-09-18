import * as cheerio from 'cheerio'
import { getSitePaths, SITE_BASE } from '@/app/sitemap'
import { readJson, writeJson } from '@/lib/s3Store'
import { getTargetKeywords } from '@/lib/targetKeywords'

/**
 * On-page SEO audit — crawls every URL the site's own sitemap lists (see
 * getSitePaths in app/sitemap.ts, the single source of truth for "how many
 * pages does the site have") and checks the things Google actually looks
 * at: title, meta description, canonical tag, image alt coverage, heading
 * structure, structured data, internal links, and (where a target keyword
 * has been set for that page) whether the keyword actually shows up where
 * it needs to. No external API for any of this — the "free stuff first"
 * phase from the handoff brief, run against the live site so what it
 * reports is what a crawler actually sees, not what the source data
 * merely intends.
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
  jsonLdBlockCount: number
  jsonLdInvalidCount: number
  internalLinks: string[] // unique internal paths this page links to
  targetKeyword: string | null
  keywordInTitle: boolean
  keywordInH1: boolean
  keywordInBody: boolean
}

export interface BrokenLink {
  targetPath: string
  status: number | null
  linkedFrom: string[] // pages that link to this broken target
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
  structuredDataCoverage: number // pages with at least one valid JSON-LD block, 0-100
  invalidStructuredDataCount: number
  brokenInternalLinks: BrokenLink[]
  pagesWithTargetKeyword: number
  pagesWithKeywordFullyPlaced: number // keyword in title AND h1 AND body
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

async function fetchWithTimeout(url: string, method: 'GET' | 'HEAD' = 'GET'): Promise<Response> {
  const controller = new AbortController()
  const t = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
  try {
    return await fetch(url, { method, signal: controller.signal, headers: { 'User-Agent': 'NebulaaSEOAudit/1.0' } })
  } finally {
    clearTimeout(t)
  }
}

/** Same-origin hrefs only, normalized to a bare path with no hash/query, excluding admin/API routes. */
function extractInternalLinks($: cheerio.CheerioAPI): string[] {
  const links = new Set<string>()
  $('a[href]').each((_, el) => {
    const href = $(el).attr('href')?.trim()
    if (!href) return
    let path: string | null = null
    if (href.startsWith('/')) path = href
    else if (href.startsWith(SITE_BASE)) path = href.slice(SITE_BASE.length) || '/'
    if (!path) return
    if (path.startsWith('/admin') || path.startsWith('/api')) return
    path = path.split('#')[0].split('?')[0]
    if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1)
    links.add(path)
  })
  return Array.from(links)
}

function checkStructuredData($: cheerio.CheerioAPI): { blocks: number; invalid: number } {
  const scripts = $('script[type="application/ld+json"]')
  let invalid = 0
  scripts.each((_, el) => {
    try {
      JSON.parse($(el).contents().text())
    } catch {
      invalid++
    }
  })
  return { blocks: scripts.length, invalid }
}

async function auditOnePage(path: string, targetKeyword: string | null): Promise<PageAudit> {
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
    jsonLdBlockCount: 0,
    jsonLdInvalidCount: 0,
    internalLinks: [],
    targetKeyword,
    keywordInTitle: false,
    keywordInH1: false,
    keywordInBody: false,
  }

  try {
    let res = await fetchWithTimeout(url)
    if (res.status === 429 || res.status >= 500) {
      await new Promise(r => setTimeout(r, 1500))
      res = await fetchWithTimeout(url)
    }
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
    const h1Text = h1s.first().text().trim()
    base.h1Text = h1Text.slice(0, 200) || null

    const images = $('img')
    base.imageCount = images.length
    images.each((_, el) => {
      const alt = $(el).attr('alt')
      if (alt && alt.trim().length > 0) base.imagesWithAlt++
      else base.imagesMissingAlt++
    })

    const jsonLd = checkStructuredData($)
    base.jsonLdBlockCount = jsonLd.blocks
    base.jsonLdInvalidCount = jsonLd.invalid

    base.internalLinks = extractInternalLinks($)

    if (targetKeyword) {
      const kw = targetKeyword.toLowerCase()
      const bodyText = $('main').text().toLowerCase() || $('body').text().toLowerCase()
      base.keywordInTitle = title.toLowerCase().includes(kw)
      base.keywordInH1 = h1Text.toLowerCase().includes(kw)
      base.keywordInBody = bodyText.includes(kw)
    }

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

/**
 * Second pass: every unique internal link target found across the crawl
 * gets checked once (HEAD, falling back to GET if HEAD isn't handled),
 * regardless of whether it's already a sitemap page — this is how a typo'd
 * href or a link to a since-removed page gets caught, which the main crawl
 * (which only ever visits sitemap URLs) can't see on its own.
 */
async function findBrokenLinks(pages: PageAudit[]): Promise<BrokenLink[]> {
  const linkedFrom = new Map<string, string[]>()
  for (const page of pages) {
    for (const target of page.internalLinks) {
      if (!linkedFrom.has(target)) linkedFrom.set(target, [])
      linkedFrom.get(target)!.push(page.path)
    }
  }

  // Lower concurrency than the main crawl, and a real second attempt after a
  // pause before calling anything broken — the second pass hits the same
  // server the first pass just finished hammering, and a transient 429 from
  // self-inflicted load looks identical to a real broken link if taken on
  // one try. A page that's actually gone still fails on the retry; a page
  // that was just rate-limited doesn't.
  const targets = Array.from(linkedFrom.keys())
  const results = await mapLimit(targets, Math.max(2, Math.floor(CONCURRENCY / 2)), async (target): Promise<BrokenLink | null> => {
    const url = `${SITE_BASE}${target}`
    const attempt = async (): Promise<Response> => {
      let res = await fetchWithTimeout(url, 'HEAD')
      if (res.status === 405) res = await fetchWithTimeout(url, 'GET') // some routes don't implement HEAD
      return res
    }
    try {
      let res = await attempt()
      if (res.ok) return null
      if (res.status === 429 || res.status >= 500) {
        await new Promise(r => setTimeout(r, 1500))
        res = await attempt()
        if (res.ok) return null
      }
      return { targetPath: target, status: res.status, linkedFrom: linkedFrom.get(target) ?? [] }
    } catch {
      return { targetPath: target, status: null, linkedFrom: linkedFrom.get(target) ?? [] }
    }
  })

  return results.filter((r): r is BrokenLink => r !== null)
}

export async function runAudit(): Promise<AuditSummary> {
  const paths = getSitePaths()
  const keywords = await getTargetKeywords()
  const pages = await mapLimit(paths, CONCURRENCY, path => auditOnePage(path, keywords[path] ?? null))
  const brokenInternalLinks = await findBrokenLinks(pages.filter(p => !p.error))

  const fetched = pages.filter(p => p.status !== null && p.status < 400)
  const failed = pages.filter(p => p.status === null || p.status >= 400)

  const withTitle = fetched.filter(p => p.title)
  const withMeta = fetched.filter(p => p.metaDescription)
  const goodTitle = fetched.filter(p => isGoodTitleLength(p.titleLength))
  const goodMeta = fetched.filter(p => isGoodMetaLength(p.metaDescriptionLength))
  const canonicalOk = fetched.filter(p => p.canonicalMatchesWww)
  const totalImages = fetched.reduce((s, p) => s + p.imageCount, 0)
  const totalImagesWithAlt = fetched.reduce((s, p) => s + p.imagesWithAlt, 0)
  const withStructuredData = fetched.filter(p => p.jsonLdBlockCount > p.jsonLdInvalidCount)
  const withKeyword = fetched.filter(p => p.targetKeyword)

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
    structuredDataCoverage: pct(withStructuredData.length, fetched.length),
    invalidStructuredDataCount: fetched.reduce((s, p) => s + p.jsonLdInvalidCount, 0),
    brokenInternalLinks,
    pagesWithTargetKeyword: withKeyword.length,
    pagesWithKeywordFullyPlaced: withKeyword.filter(p => p.keywordInTitle && p.keywordInH1 && p.keywordInBody).length,
    pages,
  }

  await writeJson(AUDIT_KEY, summary)
  return summary
}

/**
 * A stored audit from before a field was added to AuditSummary/PageAudit
 * (e.g. brokenInternalLinks, structured-data or keyword checks) comes back
 * from storage without it — same shape-drift problem blogStore.ts's
 * migrateLegacyPost handles for old posts. Default the missing pieces
 * rather than let the dashboard crash on `undefined.length`; a stale
 * audit missing new fields is a reason to re-run it, not a reason to break.
 */
function withDefaults(audit: AuditSummary): AuditSummary {
  return {
    ...audit,
    structuredDataCoverage: audit.structuredDataCoverage ?? 0,
    invalidStructuredDataCount: audit.invalidStructuredDataCount ?? 0,
    brokenInternalLinks: audit.brokenInternalLinks ?? [],
    pagesWithTargetKeyword: audit.pagesWithTargetKeyword ?? 0,
    pagesWithKeywordFullyPlaced: audit.pagesWithKeywordFullyPlaced ?? 0,
    pages: (audit.pages ?? []).map(p => ({
      ...p,
      jsonLdBlockCount: p.jsonLdBlockCount ?? 0,
      jsonLdInvalidCount: p.jsonLdInvalidCount ?? 0,
      internalLinks: p.internalLinks ?? [],
      targetKeyword: p.targetKeyword ?? null,
      keywordInTitle: p.keywordInTitle ?? false,
      keywordInH1: p.keywordInH1 ?? false,
      keywordInBody: p.keywordInBody ?? false,
    })),
  }
}

export async function getLastAudit(): Promise<AuditSummary | null> {
  const audit = await readJson<AuditSummary | null>(AUDIT_KEY, null)
  return audit ? withDefaults(audit) : null
}

function pct(part: number, total: number): number {
  if (total === 0) return 0
  return Math.round((part / total) * 100)
}
