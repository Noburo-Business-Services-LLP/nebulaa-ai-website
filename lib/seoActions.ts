import type { AuditSummary } from '@/lib/seoAudit'

/**
 * Turns a raw audit into a prioritized to-do list. A number on a dashboard
 * ("canonical consistency: 0%") doesn't tell you what to do about it — this
 * does: what the metric means, why it matters, and a ready-to-paste prompt
 * for a Claude Code session to actually go fix it (this app has no way to
 * run a coding agent against its own source from inside a deployed Lambda,
 * so "paste this into Claude Code" is the real fix path, not a "Fix" button
 * that silently does nothing).
 */

export interface ActionItem {
  id: string
  severity: 'critical' | 'warning' | 'info'
  title: string
  whatItMeans: string
  whyItMatters: string
  affectedCount: number
  samplePaths: string[]
  claudeCodePrompt: string
}

export function buildActionItems(audit: AuditSummary): ActionItem[] {
  const items: ActionItem[] = []
  const p = audit.pages

  const failed = p.filter(x => x.error)
  if (failed.length > 0) {
    items.push({
      id: 'failed-pages',
      severity: 'critical',
      title: `${failed.length} page${failed.length === 1 ? '' : 's'} failed to load during the crawl`,
      whatItMeans: 'The crawler got a network error or a non-2xx status fetching these URLs directly from the live site.',
      whyItMatters: "A page Google can't fetch can't be indexed, regardless of how good its content is.",
      affectedCount: failed.length,
      samplePaths: failed.slice(0, 10).map(x => x.path),
      claudeCodePrompt: `These URLs are failing to load on the live site: ${failed.slice(0, 10).map(x => x.path).join(', ')}. For each one, check whether the route exists, whether it 404s or 500s, and whether it's an old sitemap entry for content that no longer exists (in which case remove it from the sitemap) or a real bug (in which case fix the route). Verify by curling the live URL before and after.`,
    })
  }

  if (audit.canonicalWwwConsistency < 100) {
    const bad = p.filter(x => !x.error && !x.canonicalMatchesWww)
    items.push({
      id: 'canonical-mismatch',
      severity: 'critical',
      title: `${bad.length} page${bad.length === 1 ? '' : 's'} canonicalize to the wrong domain`,
      whatItMeans: `The <link rel="canonical"> tag on these pages doesn't point to ${audit.pages[0]?.url.split('/').slice(0, 3).join('/') ?? 'https://www.nebulaa.ai'} — it's pointing at the apex domain, which just redirects.`,
      whyItMatters: "Google's own guidance is that a sitemap and canonical tags should point at the final URL, not one that redirects — every redirecting canonical is a small trust penalty, multiplied across every page.",
      affectedCount: bad.length,
      samplePaths: bad.slice(0, 10).map(x => x.path),
      claudeCodePrompt: `The live site's canonical URLs and JSON-LD schema still point at the apex domain (nebulaa.ai) instead of the real domain (www.nebulaa.ai), which just 301s. Check app/layout.tsx's metadataBase, app/sitemap.ts, app/robots.ts, lib/orgFacts.ts and components/ui/Schema.tsx for any hardcoded "https://nebulaa.ai" instead of "https://www.nebulaa.ai", fix any you find, then confirm this is actually deployed to production (curl the live canonical tag to check) rather than just committed.`,
    })
  }

  const badTitle = p.filter(x => !x.error && (!x.title || x.titleLength < 10 || x.titleLength > 60))
  if (badTitle.length > 0) {
    items.push({
      id: 'title-length',
      severity: 'warning',
      title: `${badTitle.length} page${badTitle.length === 1 ? '' : 's'} have a missing or poorly-sized title tag`,
      whatItMeans: 'Google typically renders 50-60 characters of a title in search results; titles shorter than ~10 chars or longer than 60 get truncated or read as thin.',
      whyItMatters: 'The title tag is still the single strongest on-page relevance signal and the first thing a searcher reads.',
      affectedCount: badTitle.length,
      samplePaths: badTitle.slice(0, 10).map(x => x.path),
      claudeCodePrompt: `These pages have a missing or badly-sized <title> tag (should be 10-60 characters): ${badTitle.slice(0, 10).map(x => `${x.path} (currently ${x.titleLength} chars${x.title ? `: "${x.title}"` : ', empty'})`).join('; ')}. Find where each page sets its title metadata (usually a seoTitle field in the relevant lib/*Data.ts file, or the page's own metadata export) and rewrite it to be specific and within range — don't just truncate, write a real title.`,
    })
  }

  const badMeta = p.filter(x => !x.error && (!x.metaDescription || x.metaDescriptionLength < 70 || x.metaDescriptionLength > 160))
  if (badMeta.length > 0) {
    items.push({
      id: 'meta-length',
      severity: 'warning',
      title: `${badMeta.length} page${badMeta.length === 1 ? '' : 's'} have a missing or poorly-sized meta description`,
      whatItMeans: "Google usually shows 70-160 characters of a meta description as the search snippet; outside that range it gets cut off or Google ignores it and writes its own.",
      whyItMatters: "A written meta description is your one chance to control the pitch searchers see before they click — leaving it blank hands that to Google's auto-generated snippet instead.",
      affectedCount: badMeta.length,
      samplePaths: badMeta.slice(0, 10).map(x => x.path),
      claudeCodePrompt: `These pages have a missing or badly-sized meta description (should be 70-160 characters): ${badMeta.slice(0, 10).map(x => `${x.path} (currently ${x.metaDescriptionLength} chars)`).join('; ')}. Find where each page sets its seoDescription/metadata description and write one in range that actually describes the page's content, not generic boilerplate.`,
    })
  }

  const headingIssues = p.filter(x => !x.error && x.h1Count !== 1)
  if (headingIssues.length > 0) {
    const missing = headingIssues.filter(x => x.h1Count === 0)
    const multiple = headingIssues.filter(x => x.h1Count > 1)
    items.push({
      id: 'heading-structure',
      severity: 'warning',
      title: `${headingIssues.length} page${headingIssues.length === 1 ? '' : 's'} don't have exactly one <h1>`,
      whatItMeans: `${missing.length} page(s) have no <h1> at all; ${multiple.length} page(s) have more than one.`,
      whyItMatters: "A page's <h1> is the strongest heading-level signal of what it's about — zero h1s leaves that signal blank, and more than one makes it ambiguous which heading is the real one.",
      affectedCount: headingIssues.length,
      samplePaths: headingIssues.slice(0, 10).map(x => x.path),
      claudeCodePrompt: `These pages don't have exactly one <h1>: ${missing.length > 0 ? `missing entirely on ${missing.slice(0, 5).map(x => x.path).join(', ')}` : ''}${missing.length > 0 && multiple.length > 0 ? '; ' : ''}${multiple.length > 0 ? `multiple h1s on ${multiple.slice(0, 5).map(x => x.path).join(', ')}` : ''}. For pages missing an h1, add one that states what the page is about. For pages with multiple, check whether a markdown/content renderer is mapping in-body headings to <h1> instead of <h2> or lower (this happened once already in app/blog/[slug]/page.tsx's markdown parser) and fix the heading-level mapping so only the page's own title renders as <h1>.`,
    })
  }

  if (audit.totalImages > 0 && audit.imageAltCoverage !== null && audit.imageAltCoverage < 100) {
    const missing = p.filter(x => !x.error && x.imagesMissingAlt > 0)
    items.push({
      id: 'alt-text',
      severity: 'warning',
      title: `${missing.reduce((s, x) => s + x.imagesMissingAlt, 0)} image${missing.length === 1 ? '' : 's'} are missing alt text across ${missing.length} page(s)`,
      whatItMeans: 'These <img> elements have no alt attribute, or an empty one.',
      whyItMatters: 'Alt text is how screen readers describe an image and how Google Images understands it — missing alt text is both an accessibility and an image-search-visibility gap.',
      affectedCount: missing.length,
      samplePaths: missing.slice(0, 10).map(x => x.path),
      claudeCodePrompt: `These pages have images missing alt text: ${missing.slice(0, 10).map(x => `${x.path} (${x.imagesMissingAlt} missing)`).join('; ')}. Find each <img> or Next <Image> without a meaningful alt attribute and write a specific description of what the image actually shows — not the filename, not "image".`,
    })
  }

  return items.sort((a, b) => {
    const order = { critical: 0, warning: 1, info: 2 }
    return order[a.severity] - order[b.severity]
  })
}
