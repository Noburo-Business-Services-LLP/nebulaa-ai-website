'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  FileText, Type, AlignLeft, Image as ImageIcon, Link2, Heading1,
  AlertTriangle, CheckCircle2, RefreshCw, ExternalLink, Search,
} from 'lucide-react'
import { adminFetch, AuthGate, useAdminAuth } from '@/lib/adminClient'
import type { AuditSummary, PageAudit } from '@/lib/seoAudit'

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

// ── GSC placeholder — deliberately not faked ────────────────────────────────
function IndexingCard({ pageCount }: { pageCount: number }) {
  return (
    <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-5 flex items-start gap-4">
      <AlertTriangle size={20} className="text-orange-400 flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-white font-body font-semibold text-sm mb-1">Google Search Console isn&apos;t wired up yet</p>
        <p className="text-white/50 font-body text-xs leading-relaxed">
          As of the last manual check, GSC showed <span className="text-orange-400 font-semibold">2 of 10 discovered pages indexed</span> against
          a sitemap of {pageCount} URLs — a real, unresolved problem. This card will show the live number once a Google Cloud service
          account is connected (Search Console → Settings → Users and permissions → add the service account as a user).
        </p>
      </div>
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

function PageRow({ page }: { page: PageAudit }) {
  const failed = page.error !== null
  const titleOk = Boolean(page.title) && page.titleLength >= 10 && page.titleLength <= 60
  const metaOk = Boolean(page.metaDescription) && page.metaDescriptionLength >= 70 && page.metaDescriptionLength <= 160
  const altOk = page.imageCount === 0 || page.imagesMissingAlt === 0
  const h1Ok = page.h1Count === 1

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
      <div className="flex flex-wrap gap-1.5">
        <ProblemBadge ok={titleOk} label={page.title ? `title ${page.titleLength}ch` : 'no title'} />
        <ProblemBadge ok={metaOk} label={page.metaDescription ? `meta ${page.metaDescriptionLength}ch` : 'no meta'} />
        <ProblemBadge ok={page.canonicalMatchesWww} label={page.canonicalMatchesWww ? 'canonical ok' : 'canonical mismatch'} />
        <ProblemBadge ok={h1Ok} label={page.h1Count === 0 ? 'no h1' : page.h1Count > 1 ? `${page.h1Count} h1s` : '1 h1'} />
        {page.imageCount > 0 && (
          <ProblemBadge ok={altOk} label={altOk ? `${page.imageCount} imgs, all alt` : `${page.imagesMissingAlt}/${page.imageCount} missing alt`} />
        )}
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

  return (
    <div className="space-y-6">
      <IndexingCard pageCount={audit.pageCount} />

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
      </div>

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
            {pages.map(page => <PageRow key={page.path} page={page} />)}
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
