'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  FileText, Type, AlignLeft, Image as ImageIcon, Link2, Heading1,
  AlertTriangle, CheckCircle2, RefreshCw, ExternalLink, Search,
  Copy, ChevronDown, ChevronUp, ListChecks, Braces, Unlink, Target,
  History,
} from 'lucide-react'
import { adminFetch, AuthGate, useAdminAuth } from '@/lib/adminClient'
import type { AuditSummary, PageAudit } from '@/lib/seoAudit'
import { buildActionItems, type ActionItem } from '@/lib/seoActions'
import type { AuditHistoryPoint } from '@/lib/auditHistory'

// ── Stat card (matches app/admin/page.tsx's visual language) ───────────────
function StatCard({
  label, value, sub, icon, color, bg, border,
}: {
  label: string
  value: string
  sub: string
  icon: React.ReactNode
  color: string
  bg: string
  border: string
}) {
  return (
    <div className={`bg-[#111110] border ${border} rounded-2xl p-5`}>
      <div className={`w-9 h-9 rounded-xl ${bg} border ${border} flex items-center justify-center ${color} mb-3`}>
        {icon}
      </div>
      <p className="text-white font-heading font-bold text-3xl mb-0.5">{value}</p>
      <p className="text-white/60 font-body text-xs font-semibold">{label}</p>
      <p className="text-white/30 font-body text-xs mt-1">{sub}</p>
    </div>
  )
}

function toneFor(pct: number): { color: string; bg: string; border: string } {
  if (pct >= 90) return { color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/20' }
  if (pct >= 60) return { color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20' }
  return { color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20' }
}

function pctSafe(part: number, total: number): number {
  return total === 0 ? 0 : Math.round((part / total) * 100)
}

// ── Google Search Console — real indexing + query data once configured ─────
interface GscIndexing {
  configured: boolean
  error: string | null
  totalChecked: number
  indexed: number
  notIndexed: number
  pages: { path: string; verdict: string; coverageState: string | null }[]
}
interface GscPerformance {
  configured: boolean
  error: string | null
  totalClicks: number
  totalImpressions: number
  topQueries: { query: string; clicks: number; impressions: number; ctr: number; position: number }[]
  pageClicks: { path: string; clicks: number; impressions: number }[]
}

function IndexingCard({ pageCount, secret }: { pageCount: number; secret: string }) {
  const [checking, setChecking] = useState(false)
  const [checked, setChecked] = useState(false)
  const [indexing, setIndexing] = useState<GscIndexing | null>(null)
  const [performance, setPerformance] = useState<GscPerformance | null>(null)
  const [notConfigured, setNotConfigured] = useState(false)

  const check = async () => {
    setChecking(true)
    try {
      const d = await adminFetch<{ indexing: GscIndexing; performance: GscPerformance }>('/api/admin/gsc', secret)
      if (d) {
        setIndexing(d.indexing)
        setPerformance(d.performance)
        setNotConfigured(!d.indexing.configured)
        setChecked(true)
      }
    } finally {
      setChecking(false)
    }
  }

  if (!checked) {
    return (
      <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-5 flex items-start gap-4">
        <AlertTriangle size={20} className="text-orange-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-white font-body font-semibold text-sm mb-1">Google Search Console indexing status</p>
          <p className="text-white/50 font-body text-xs leading-relaxed mb-3">
            As of the last manual check, GSC showed <span className="text-orange-400 font-semibold">2 of 10 discovered pages indexed</span> against
            a sitemap of {pageCount} URLs. If a service account is connected, checking below inspects the ~14 highest-priority hub and product
            pages — Google&apos;s own URL Inspection API takes roughly 10 seconds per URL, so checking all {pageCount} isn&apos;t practical on demand;
            full-site indexing coverage is what Search Console&apos;s own UI is for.
          </p>
          <button onClick={check} disabled={checking} className="bg-orange-500/20 border border-orange-500/30 text-orange-300 font-body text-xs font-semibold rounded-full px-4 py-2 hover:bg-orange-500/30 transition-all disabled:opacity-50">
            {checking ? 'Checking priority pages…' : 'Check indexing status now'}
          </button>
        </div>
      </div>
    )
  }

  if (notConfigured) {
    return (
      <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-5 flex items-start gap-4">
        <AlertTriangle size={20} className="text-orange-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-white font-body font-semibold text-sm mb-1">Google Search Console isn&apos;t wired up yet</p>
          <p className="text-white/50 font-body text-xs leading-relaxed">
            No service account credentials found (GSC_CLIENT_EMAIL / GSC_PRIVATE_KEY). Once connected — Search Console → Settings →
            Users and permissions → add the service account as a Restricted user — this card shows live indexing and query data.
          </p>
        </div>
      </div>
    )
  }

  if (indexing?.error || performance?.error) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-5 flex items-start gap-4">
        <AlertTriangle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-white font-body font-semibold text-sm mb-1">Search Console request failed</p>
          <p className="text-white/50 font-body text-xs leading-relaxed mb-3">{indexing?.error || performance?.error}</p>
          <p className="text-white/30 font-body text-xs leading-relaxed mb-3">
            Common causes: the API isn&apos;t enabled on the Google Cloud project yet, the service account hasn&apos;t been added as a Search
            Console user yet (permission changes can take a few minutes to propagate), or GSC_PROPERTY doesn&apos;t match the property&apos;s
            actual form (domain property → &quot;sc-domain:nebulaa.ai&quot;, URL-prefix property → &quot;https://www.nebulaa.ai/&quot;).
          </p>
          <button onClick={check} disabled={checking} className="text-white/50 hover:text-white font-body text-xs font-semibold transition-colors disabled:opacity-50">
            {checking ? 'Retrying…' : 'Try again'}
          </button>
        </div>
      </div>
    )
  }

  const idxPct = indexing ? pctSafe(indexing.indexed, indexing.totalChecked) : 0

  return (
    <div className={`${idxPct < 80 ? 'bg-orange-500/10 border-orange-500/30' : 'bg-green-500/10 border-green-500/30'} border rounded-2xl p-5`}>
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <p className="text-white font-body font-semibold text-sm mb-1">
            {indexing?.indexed} of {indexing?.totalChecked} priority pages indexed
          </p>
          <p className="text-white/50 font-body text-xs">
            {performance?.totalClicks ?? 0} clicks · {performance?.totalImpressions ?? 0} impressions in the last 28 days
          </p>
        </div>
        <button onClick={check} disabled={checking} className="flex items-center gap-1.5 text-white/40 hover:text-white font-body text-xs font-semibold transition-colors disabled:opacity-50 flex-shrink-0">
          <RefreshCw size={12} className={checking ? 'animate-spin' : ''} /> Recheck
        </button>
      </div>
      {indexing && indexing.notIndexed > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {indexing.pages.filter(p => p.verdict !== 'PASS').slice(0, 12).map(p => (
            <span key={p.path} className="text-white/50 font-mono text-[10px] bg-white/5 rounded-full px-2.5 py-1" title={p.coverageState ?? undefined}>
              {p.path || '/'} — {p.coverageState ?? p.verdict}
            </span>
          ))}
        </div>
      )}
      {performance && performance.topQueries.length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-white/30 font-body text-[10px] font-bold uppercase tracking-widest mb-2">Top queries, last 28 days</p>
          <div className="flex flex-wrap gap-1.5">
            {performance.topQueries.slice(0, 10).map(q => (
              <span key={q.query} className="text-white/60 font-body text-[11px] bg-white/5 rounded-full px-2.5 py-1">
                {q.query} <span className="text-white/30">· {q.clicks}c / {q.impressions}i</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ── History — every past run, so "are we improving" has an answer ──────────
function trendArrow(current: number, previous: number | undefined) {
  if (previous === undefined || current === previous) return null
  const up = current > previous
  return (
    <span className={`font-mono text-[10px] ${up ? 'text-green-400' : 'text-red-400'}`}>
      {up ? '↑' : '↓'} {Math.abs(current - previous)}
    </span>
  )
}

function HistoryPanel({ secret }: { secret: string }) {
  const [history, setHistory] = useState<AuditHistoryPoint[] | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    adminFetch<{ history: AuditHistoryPoint[] }>('/api/admin/seo-history', secret)
      .then(d => { if (d) setHistory(d.history) })
      .catch(() => setHistory([]))
  }, [secret])

  if (!history || history.length === 0) return null

  const rows = [...history].reverse() // newest first
  const cols: { key: keyof AuditHistoryPoint; label: string; suffix?: string }[] = [
    { key: 'titleCoverage', label: 'Title', suffix: '%' },
    { key: 'metaDescriptionCoverage', label: 'Meta', suffix: '%' },
    { key: 'canonicalWwwConsistency', label: 'Canonical', suffix: '%' },
    { key: 'structuredDataCoverage', label: 'Schema', suffix: '%' },
    { key: 'brokenInternalLinksCount', label: 'Broken links' },
    { key: 'missingH1Count', label: 'Missing h1' },
  ]

  return (
    <div className="bg-[#111110] border border-white/8 rounded-2xl overflow-hidden">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between gap-4 px-5 py-4">
        <div className="flex items-center gap-2.5">
          <History size={15} className="text-brand-gold" />
          <p className="text-white font-body font-semibold text-sm">{history.length} past audit run{history.length === 1 ? '' : 's'}</p>
        </div>
        {open ? <ChevronUp size={16} className="text-white/40" /> : <ChevronDown size={16} className="text-white/40" />}
      </button>
      {open && (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-t border-white/8">
                <th className="px-5 py-2.5 text-white/30 font-body text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">Run</th>
                {cols.map(c => (
                  <th key={c.key} className="px-3 py-2.5 text-white/30 font-body text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">{c.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => {
                const prev = rows[i + 1]
                return (
                  <tr key={r.runAt} className="border-t border-white/5">
                    <td className="px-5 py-2.5 text-white/60 font-mono text-xs whitespace-nowrap">
                      {new Date(r.runAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </td>
                    {cols.map(c => (
                      <td key={c.key} className="px-3 py-2.5 text-white font-mono text-xs whitespace-nowrap">
                        <span className="flex items-center gap-1.5">
                          {r[c.key] ?? '—'}{c.suffix ?? ''}
                          {trendArrow(Number(r[c.key] ?? 0), prev ? Number(prev[c.key] ?? 0) : undefined)}
                        </span>
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

// ── Action items — what each flagged number actually means and how to fix it ─
const SEVERITY_STYLE = {
  critical: { color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20' },
  warning: { color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20' },
  info: { color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' },
} as const

function ActionItemCard({ item }: { item: ActionItem }) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const style = SEVERITY_STYLE[item.severity]

  const copyPrompt = () => {
    navigator.clipboard.writeText(item.claudeCodePrompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={`bg-[#111110] border ${style.border} rounded-2xl overflow-hidden`}>
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left">
        <div className="flex items-center gap-3 min-w-0">
          <span className={`w-7 h-7 rounded-lg ${style.bg} border ${style.border} flex items-center justify-center ${style.color} flex-shrink-0`}>
            <AlertTriangle size={14} />
          </span>
          <p className="text-white font-body font-semibold text-sm truncate">{item.title}</p>
        </div>
        {open ? <ChevronUp size={16} className="text-white/40 flex-shrink-0" /> : <ChevronDown size={16} className="text-white/40 flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-5 pb-5 space-y-4">
          <div>
            <p className="text-white/30 font-body text-[10px] font-bold uppercase tracking-widest mb-1">What it means</p>
            <p className="text-white/70 font-body text-xs leading-relaxed">{item.whatItMeans}</p>
          </div>
          <div>
            <p className="text-white/30 font-body text-[10px] font-bold uppercase tracking-widest mb-1">Why it matters</p>
            <p className="text-white/70 font-body text-xs leading-relaxed">{item.whyItMatters}</p>
          </div>
          {item.samplePaths.length > 0 && (
            <div>
              <p className="text-white/30 font-body text-[10px] font-bold uppercase tracking-widest mb-1.5">
                Affected pages {item.affectedCount > item.samplePaths.length && `(${item.samplePaths.length} of ${item.affectedCount} shown)`}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {item.samplePaths.map(path => (
                  <span key={path} className="text-white/50 font-mono text-[10px] bg-white/5 rounded-full px-2.5 py-1">{path || '/'}</span>
                ))}
              </div>
            </div>
          )}
          <div className="bg-white/3 border border-white/8 rounded-xl p-3.5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-white/30 font-body text-[10px] font-bold uppercase tracking-widest">Paste into Claude Code</p>
              <button onClick={copyPrompt} className="flex items-center gap-1.5 text-brand-gold hover:text-brand-gold-dim font-body text-[11px] font-semibold transition-colors">
                <Copy size={11} /> {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <p className="text-white/60 font-mono text-[11px] leading-relaxed">{item.claudeCodePrompt}</p>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Row detail for a single page ────────────────────────────────────────────
function ProblemBadge({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-body font-semibold px-2 py-0.5 rounded-full ${ok ? 'bg-green-400/10 text-green-400' : 'bg-red-400/10 text-red-400'}`}>
      {ok ? <CheckCircle2 size={10} /> : <AlertTriangle size={10} />}
      {label}
    </span>
  )
}

function PageRow({ page, secret }: { page: PageAudit; secret: string }) {
  const failed = page.error !== null
  const titleOk = Boolean(page.title) && page.titleLength >= 10 && page.titleLength <= 60
  const metaOk = Boolean(page.metaDescription) && page.metaDescriptionLength >= 70 && page.metaDescriptionLength <= 160
  const altOk = page.imageCount === 0 || page.imagesMissingAlt === 0
  const h1Ok = page.h1Count === 1
  const jsonLdOk = page.jsonLdInvalidCount === 0
  const keywordOk = !page.targetKeyword || (page.keywordInTitle && page.keywordInH1 && page.keywordInBody)

  const [keywordInput, setKeywordInput] = useState(page.targetKeyword ?? '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const saveKeyword = async () => {
    setSaving(true)
    try {
      await adminFetch('/api/admin/target-keywords', secret, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: page.path, keyword: keywordInput }),
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 1500)
    } finally {
      setSaving(false)
    }
  }

  if (failed) {
    return (
      <div className="flex items-center gap-4 px-5 py-3">
        <span className="flex-1 min-w-0 text-white/50 font-body text-xs font-mono truncate">{page.path || '/'}</span>
        <span className="text-red-400 font-body text-xs font-semibold flex-shrink-0">{page.error}</span>
      </div>
    )
  }

  return (
    <div className="px-5 py-3">
      <div className="flex items-center gap-3 mb-2">
        <a href={page.url} target="_blank" rel="noreferrer" className="text-white/80 hover:text-brand-gold font-body text-xs font-mono truncate flex items-center gap-1.5 transition-colors">
          {page.path || '/'} <ExternalLink size={10} className="flex-shrink-0 opacity-50" />
        </a>
      </div>
      <div className="flex flex-wrap gap-1.5 mb-2">
        <ProblemBadge ok={titleOk} label={page.title ? `title ${page.titleLength}ch` : 'no title'} />
        <ProblemBadge ok={metaOk} label={page.metaDescription ? `meta ${page.metaDescriptionLength}ch` : 'no meta'} />
        <ProblemBadge ok={page.canonicalMatchesWww} label={page.canonicalMatchesWww ? 'canonical ok' : 'canonical mismatch'} />
        <ProblemBadge ok={h1Ok} label={page.h1Count === 0 ? 'no h1' : page.h1Count > 1 ? `${page.h1Count} h1s` : '1 h1'} />
        {page.imageCount > 0 && (
          <ProblemBadge ok={altOk} label={altOk ? `${page.imageCount} imgs, all alt` : `${page.imagesMissingAlt}/${page.imageCount} missing alt`} />
        )}
        {page.jsonLdBlockCount > 0 && (
          <ProblemBadge ok={jsonLdOk} label={jsonLdOk ? `${page.jsonLdBlockCount} schema ok` : `${page.jsonLdInvalidCount} invalid schema`} />
        )}
        {page.targetKeyword && <ProblemBadge ok={keywordOk} label={keywordOk ? 'keyword placed' : 'keyword incomplete'} />}
      </div>
      <div className="flex items-center gap-2">
        <input
          value={keywordInput}
          onChange={e => setKeywordInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && saveKeyword()}
          placeholder="Target keyword…"
          className="flex-1 max-w-xs bg-white/5 border border-white/10 rounded-full px-3 py-1 text-white/70 font-body text-[11px] outline-none focus:border-brand-gold placeholder:text-white/20"
        />
        <button
          onClick={saveKeyword}
          disabled={saving || keywordInput === (page.targetKeyword ?? '')}
          className="text-white/40 hover:text-brand-gold font-body text-[10px] font-semibold transition-colors disabled:opacity-30"
        >
          {saved ? 'Saved' : saving ? 'Saving…' : 'Save'}
        </button>
      </div>
    </div>
  )
}

// ── Main dashboard ───────────────────────────────────────────────────────────
function SeoDashboard({ secret }: { secret: string }) {
  const [audit, setAudit] = useState<AuditSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [running, setRunning] = useState(false)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<'all' | 'problems'>('all')
  const [search, setSearch] = useState('')

  const load = useCallback(() => {
    setLoading(true)
    adminFetch<{ audit: AuditSummary | null }>('/api/admin/seo-audit', secret)
      .then(d => { if (d) setAudit(d.audit); setLoading(false) })
      .catch(() => setLoading(false))
  }, [secret])

  useEffect(() => { load() }, [load])

  const runNow = async () => {
    setRunning(true)
    setError('')
    try {
      const d = await adminFetch<{ audit: AuditSummary }>('/api/admin/seo-audit', secret, { method: 'POST' })
      if (d) setAudit(d.audit)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Audit failed')
    } finally {
      setRunning(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-center">
          <div className="text-3xl mb-3 animate-bounce">🔍</div>
          <p className="text-white/40 font-body text-sm">Loading last audit...</p>
        </div>
      </div>
    )
  }

  if (!audit) {
    return (
      <div className="text-center py-24">
        <Search size={32} className="text-white/20 mx-auto mb-4" />
        <p className="text-white font-body font-semibold mb-2">No audit has run yet</p>
        <p className="text-white/40 font-body text-sm mb-6">Crawl every page the sitemap lists and check titles, meta descriptions, alt text and canonical URLs.</p>
        <button onClick={runNow} disabled={running} className="bg-brand-gold text-brand-black font-body font-bold rounded-full px-6 py-3 hover:bg-brand-gold-dim transition-all disabled:opacity-40">
          {running ? 'Crawling…' : 'Run first audit'}
        </button>
        {error && <p className="text-red-400 font-body text-sm mt-4">{error}</p>}
      </div>
    )
  }

  const pages = audit.pages
    .filter(p => filter === 'all' || p.error || !p.title || !p.metaDescription || !p.canonicalMatchesWww || p.h1Count !== 1 || p.imagesMissingAlt > 0)
    .filter(p => search === '' || p.path.toLowerCase().includes(search.toLowerCase()))

  const actionItems = buildActionItems(audit)

  return (
    <div className="space-y-6">
      <IndexingCard pageCount={audit.pageCount} secret={secret} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Pages in sitemap"
          value={String(audit.pageCount)}
          sub={audit.pagesFailed > 0 ? `${audit.pagesFailed} failed to load` : 'all reachable'}
          icon={<FileText size={16} />}
          {...(audit.pagesFailed > 0 ? toneFor(50) : toneFor(100))}
        />
        <StatCard
          label="Title coverage"
          value={`${audit.titleCoverage}%`}
          sub={`${audit.goodTitleLengthPct}% in the 10–60 char range`}
          icon={<Type size={16} />}
          {...toneFor(audit.titleCoverage)}
        />
        <StatCard
          label="Meta description coverage"
          value={`${audit.metaDescriptionCoverage}%`}
          sub={`${audit.goodMetaLengthPct}% in the 70–160 char range`}
          icon={<AlignLeft size={16} />}
          {...toneFor(audit.metaDescriptionCoverage)}
        />
        <StatCard
          label="Image alt-text coverage"
          value={audit.imageAltCoverage === null ? 'N/A' : `${audit.imageAltCoverage}%`}
          sub={audit.totalImages === 0 ? 'no <img> tags found on the site' : `across ${audit.totalImages} images found`}
          icon={<ImageIcon size={16} />}
          {...(audit.imageAltCoverage === null
            ? { color: 'text-white/40', bg: 'bg-white/5', border: 'border-white/10' }
            : toneFor(audit.imageAltCoverage))}
        />
        <StatCard
          label="Canonical → www consistency"
          value={`${audit.canonicalWwwConsistency}%`}
          sub="pages canonicalizing to www.nebulaa.ai"
          icon={<Link2 size={16} />}
          {...toneFor(audit.canonicalWwwConsistency)}
        />
        <StatCard
          label="Heading structure"
          value={String(audit.missingH1Count + audit.multipleH1Count)}
          sub={`${audit.missingH1Count} missing h1 · ${audit.multipleH1Count} with multiple`}
          icon={<Heading1 size={16} />}
          {...toneFor(audit.missingH1Count + audit.multipleH1Count === 0 ? 100 : 40)}
        />
        <StatCard
          label="Structured data coverage"
          value={`${audit.structuredDataCoverage}%`}
          sub={audit.invalidStructuredDataCount > 0 ? `${audit.invalidStructuredDataCount} invalid block(s)` : 'pages with valid JSON-LD'}
          icon={<Braces size={16} />}
          {...toneFor(audit.structuredDataCoverage)}
        />
        <StatCard
          label="Broken internal links"
          value={String(audit.brokenInternalLinks.length)}
          sub="found in nav, footer, and body copy"
          icon={<Unlink size={16} />}
          {...toneFor(audit.brokenInternalLinks.length === 0 ? 100 : 30)}
        />
        <StatCard
          label="Target keywords assigned"
          value={String(audit.pagesWithTargetKeyword)}
          sub={audit.pagesWithTargetKeyword > 0 ? `${audit.pagesWithKeywordFullyPlaced} fully placed in title/h1/body` : 'set one per page in the table below'}
          icon={<Target size={16} />}
          {...(audit.pagesWithTargetKeyword === 0
            ? { color: 'text-white/40', bg: 'bg-white/5', border: 'border-white/10' }
            : toneFor(pctSafe(audit.pagesWithKeywordFullyPlaced, audit.pagesWithTargetKeyword)))}
        />
      </div>

      <HistoryPanel secret={secret} />

      {/* Action items — what to actually do about the numbers above */}
      {actionItems.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <ListChecks size={16} className="text-brand-gold" />
            <p className="text-white font-body font-semibold text-sm">{actionItems.length} thing{actionItems.length === 1 ? '' : 's'} to fix, ranked by severity</p>
          </div>
          <div className="space-y-2.5">
            {actionItems.map(item => <ActionItemCard key={item.id} item={item} />)}
          </div>
        </div>
      )}

      {/* Page-by-page */}
      <div className="bg-[#111110] border border-white/8 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-white font-body font-semibold text-sm">{pages.length} of {audit.pages.length} pages</p>
            <p className="text-white/30 font-body text-xs mt-0.5">
              Last run {new Date(audit.runAt).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Filter by path…"
              className="bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-white font-body text-xs outline-none focus:border-brand-gold placeholder:text-white/20"
            />
            <div className="flex gap-0.5 bg-white/5 rounded-full p-1">
              {(['all', 'problems'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`font-body text-xs font-semibold rounded-full px-3 py-1.5 transition-all whitespace-nowrap ${filter === f ? 'bg-brand-gold text-brand-black' : 'text-white/50 hover:text-white'}`}
                >
                  {f === 'all' ? 'All' : 'Problems only'}
                </button>
              ))}
            </div>
            <button
              onClick={runNow}
              disabled={running}
              className="flex items-center gap-1.5 text-white/50 hover:text-white font-body text-xs font-semibold border border-white/10 rounded-full px-3 py-1.5 transition-colors disabled:opacity-40"
            >
              <RefreshCw size={12} className={running ? 'animate-spin' : ''} />
              {running ? 'Crawling…' : 'Re-run audit'}
            </button>
          </div>
        </div>
        {error && <p className="text-red-400 font-body text-sm px-5 pt-3">{error}</p>}
        {pages.length === 0 ? (
          <div className="p-8 text-center text-white/30 font-body text-sm">No pages match this filter.</div>
        ) : (
          <div className="divide-y divide-white/5 max-h-[600px] overflow-y-auto">
            {pages.map(page => <PageRow key={page.path} page={page} secret={secret} />)}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Page shell — matches app/admin/page.tsx / app/admin/media/page.tsx ─────
export default function SeoAdminPage() {
  const { secret, setSecret, verifying } = useAdminAuth()

  if (verifying) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <div className="text-3xl mb-3 animate-bounce">⚡</div>
          <p className="text-white/40 font-body text-sm">Authenticating...</p>
        </div>
      </div>
    )
  }

  if (!secret) return <AuthGate onAuth={setSecret} />

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <div className="bg-[#111110] border-b border-white/5 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-brand-gold font-heading font-bold text-lg">nebulaa admin</span>
            <span className="text-white/20 text-xs font-body hidden sm:block">SEO dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/admin" className="text-white/40 hover:text-brand-gold font-body text-xs transition-colors whitespace-nowrap">
              overview
            </a>
            <a href="/admin/blog" className="text-white/40 hover:text-brand-gold font-body text-xs transition-colors whitespace-nowrap">
              blog
            </a>
            <a href="/admin/media" className="text-white/40 hover:text-brand-gold font-body text-xs transition-colors whitespace-nowrap">
              media
            </a>
            <button onClick={() => { sessionStorage.removeItem('admin_secret'); setSecret(null) }} className="text-white/30 hover:text-white/60 font-body text-xs transition-colors">
              logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
          <SeoDashboard secret={secret} />
        </motion.div>
      </div>
    </div>
  )
}
