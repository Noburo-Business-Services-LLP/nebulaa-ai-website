'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { blogIdeas, newsletterIdeas, type ContentIdea } from '@/lib/contentIdeas'
import { Users, FileText, Send, TrendingUp, ChevronUp, ChevronDown, Eye, BarChart2, Globe, BookOpen } from 'lucide-react'
import { adminFetch, AuthGate, useAdminAuth } from '@/lib/adminClient'

// ── Types ──────────────────────────────────────────────────────────────────
interface Lead { id: string; name: string; email: string; source: string; date: string; tags: string[] }
interface SendRecord { id: string; subject: string; date: string; sent: number; failed: number; totalLeads: number; testMode: boolean }
interface GrowthPoint { date: string; count: number }
interface StatsData {
  totalSubscribers: number
  thisMonthSignups: number
  totalBlogPosts: number
  totalEmailsSent: number
  totalSendCampaigns: number
  growth: GrowthPoint[]
  sources: Record<string, number>
  recentLeads: Lead[]
  sends: SendRecord[]
}
interface AnalyticsData {
  totalViews: number
  todayViews: number
  last7Views: number
  thisMonthViews: number
  lastMonthViews: number
  dailyViews: { date: string; count: number }[]
  topPages: { page: string; count: number }[]
  referrers: { ref: string; count: number }[]
}

// Auth (adminFetch, AuthGate, useAdminAuth) now lives in lib/adminClient —
// shared across every /admin/* page instead of copy-pasted per page.

// ── Mini Bar Chart ─────────────────────────────────────────────────────────
function MiniBarChart({ data, color = 'brand-gold' }: { data: { date: string; count: number }[]; color?: string }) {
  const max = Math.max(...data.map(d => d.count), 1)
  return (
    <div className="flex items-end gap-[3px] h-20">
      {data.map((point, i) => {
        const pct = (point.count / max) * 100
        const dayLabel = new Date(point.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        return (
          <div key={point.date} className="flex-1 flex flex-col items-center gap-1 group">
            <div className="relative w-full flex flex-col justify-end" style={{ height: '72px' }}>
              <div
                className={`w-full rounded-t-sm transition-all cursor-default relative ${color === 'brand-gold' ? 'bg-brand-gold/30 hover:bg-brand-gold/60' : 'bg-blue-400/30 hover:bg-blue-400/60'}`}
                style={{ height: `${Math.max(pct, point.count > 0 ? 8 : 2)}%` }}
              >
                {point.count > 0 && (
                  <div className={`absolute -top-6 left-1/2 -translate-x-1/2 font-body font-bold text-[9px] px-1.5 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap ${color === 'brand-gold' ? 'bg-brand-gold text-brand-black' : 'bg-blue-400 text-white'}`}>
                    {point.count}
                  </div>
                )}
              </div>
            </div>
            {(i % Math.ceil(data.length / 7) === 0) && (
              <p className="text-white/20 font-body text-[8px] whitespace-nowrap">{dayLabel}</p>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ── Website Analytics ──────────────────────────────────────────────────────
function WebsiteAnalytics({ secret }: { secret: string }) {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(() => {
    setLoading(true)
    adminFetch<AnalyticsData>('/api/admin/analytics', secret)
      .then(d => { if (d) setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [secret])

  useEffect(() => { fetchData() }, [fetchData])

  if (loading) return <LoadingSpinner />
  if (!data) return <ErrorMsg text="Failed to load analytics." />

  const growthPct = data.lastMonthViews > 0
    ? Math.round(((data.thisMonthViews - data.lastMonthViews) / data.lastMonthViews) * 100)
    : null

  const statCards = [
    { label: 'Total Page Views', value: data.totalViews, icon: <Eye size={16} />, sub: 'all time', color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' },
    { label: 'Today', value: data.todayViews, icon: <TrendingUp size={16} />, sub: 'views today', color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/20' },
    { label: 'Last 7 Days', value: data.last7Views, icon: <BarChart2 size={16} />, sub: 'rolling 7d', color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20' },
    { label: 'This Month', value: data.thisMonthViews, icon: <Globe size={16} />, sub: growthPct !== null ? `${growthPct >= 0 ? '+' : ''}${growthPct}% vs last month` : 'vs last month', color: 'text-brand-gold', bg: 'bg-brand-gold/10', border: 'border-brand-gold/20' },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className={`bg-[#111110] border ${card.border} rounded-2xl p-5`}>
            <div className={`w-8 h-8 rounded-xl ${card.bg} border ${card.border} flex items-center justify-center ${card.color} mb-3`}>
              {card.icon}
            </div>
            <p className="text-white font-heading font-bold text-3xl mb-0.5">{card.value.toLocaleString()}</p>
            <p className="text-white/60 font-body text-xs font-semibold">{card.label}</p>
            <p className="text-white/30 font-body text-xs mt-1">{card.sub}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        {/* Daily chart */}
        <div className="bg-[#111110] border border-white/8 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white font-body font-semibold text-sm">Page Views — Last 30 Days</p>
              <p className="text-white/30 font-body text-xs mt-0.5">{data.last7Views} in past week</p>
            </div>
          </div>
          <MiniBarChart data={data.dailyViews} color="blue-400" />
        </div>

        {/* Referrers */}
        <div className="bg-[#111110] border border-white/8 rounded-2xl p-5">
          <p className="text-white font-body font-semibold text-sm mb-4">Traffic Sources</p>
          {data.referrers.length === 0 ? (
            <p className="text-white/30 font-body text-xs">No data yet — start getting traffic!</p>
          ) : (
            <div className="space-y-3">
              {data.referrers.map(({ ref, count }) => {
                const pct = data.totalViews > 0 ? Math.round((count / data.totalViews) * 100) : 0
                return (
                  <div key={ref}>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-white/70 font-body text-xs">{ref}</p>
                      <p className="text-white/40 font-body text-xs">{count} · {pct}%</p>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-400/50 rounded-full transition-all" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Top pages */}
      <div className="bg-[#111110] border border-white/8 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/8">
          <p className="text-white font-body font-semibold text-sm">Top Pages</p>
        </div>
        {data.topPages.length === 0 ? (
          <div className="p-8 text-center text-white/30 font-body text-xs">No page views tracked yet</div>
        ) : (
          <div className="divide-y divide-white/5">
            {data.topPages.map(({ page, count }, i) => {
              const pct = data.totalViews > 0 ? Math.round((count / data.totalViews) * 100) : 0
              return (
                <div key={page} className="flex items-center gap-4 px-5 py-3">
                  <span className="text-white/20 font-body text-xs w-5 text-right flex-shrink-0">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-white/80 font-body text-sm truncate">{page}</p>
                    <div className="h-1 bg-white/5 rounded-full mt-1.5 overflow-hidden">
                      <div className="h-full bg-blue-400/40 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-white font-body text-sm font-semibold">{count.toLocaleString()}</p>
                    <p className="text-white/30 font-body text-[10px]">{pct}%</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button onClick={fetchData} className="text-white/30 hover:text-white font-body text-xs transition-colors flex items-center gap-1.5">
          <span>↻</span> Refresh
        </button>
      </div>
    </div>
  )
}

// ── Blog Analytics ─────────────────────────────────────────────────────────
function BlogAnalytics({ secret }: { secret: string }) {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(() => {
    setLoading(true)
    Promise.all([
      adminFetch<StatsData>('/api/admin/stats', secret),
      adminFetch<AnalyticsData>('/api/admin/analytics', secret),
    ]).then(([s, a]) => {
      if (s) setStats(s)
      if (a) setAnalyticsData(a)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [secret])

  useEffect(() => { fetchData() }, [fetchData])

  if (loading) return <LoadingSpinner />
  if (!stats || !analyticsData) return <ErrorMsg text="Failed to load blog analytics." />

  // Extract blog page views from analytics
  const blogPageViews = analyticsData.topPages.filter(p => p.page.startsWith('/blog/'))
  const totalBlogViews = blogPageViews.reduce((s, p) => s + p.count, 0)
  const blogIndexViews = analyticsData.topPages.find(p => p.page === '/blog')?.count || 0

  const avgViewsPerPost = stats.totalBlogPosts > 0 ? Math.round(totalBlogViews / stats.totalBlogPosts) : 0

  const statCards = [
    { label: 'Blog Posts', value: stats.totalBlogPosts, icon: <FileText size={16} />, sub: 'published', color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20' },
    { label: 'Blog Page Views', value: totalBlogViews, icon: <Eye size={16} />, sub: 'all time', color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' },
    { label: 'Blog Index Views', value: blogIndexViews, icon: <BookOpen size={16} />, sub: '/blog page', color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/20' },
    { label: 'Avg Views/Post', value: avgViewsPerPost, icon: <BarChart2 size={16} />, sub: 'per article', color: 'text-brand-gold', bg: 'bg-brand-gold/10', border: 'border-brand-gold/20' },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className={`bg-[#111110] border ${card.border} rounded-2xl p-5`}>
            <div className={`w-8 h-8 rounded-xl ${card.bg} border ${card.border} flex items-center justify-center ${card.color} mb-3`}>
              {card.icon}
            </div>
            <p className="text-white font-heading font-bold text-3xl mb-0.5">{card.value.toLocaleString()}</p>
            <p className="text-white/60 font-body text-xs font-semibold">{card.label}</p>
            <p className="text-white/30 font-body text-xs mt-1">{card.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Top blog posts by views */}
      <div className="bg-[#111110] border border-white/8 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/8">
          <p className="text-white font-body font-semibold text-sm">Top Blog Posts by Views</p>
        </div>
        {blogPageViews.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-white/30 font-body text-sm mb-2">No blog post views tracked yet</p>
            <p className="text-white/20 font-body text-xs">Views will appear here once readers visit your blog posts.</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {blogPageViews.map(({ page, count }, i) => {
              const slug = page.replace('/blog/', '')
              const pct = totalBlogViews > 0 ? Math.round((count / totalBlogViews) * 100) : 0
              return (
                <div key={page} className="flex items-center gap-4 px-5 py-3">
                  <span className="text-white/20 font-body text-xs w-5 text-right flex-shrink-0">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-white/80 font-body text-xs font-semibold truncate">{slug}</p>
                    <div className="h-1 bg-white/5 rounded-full mt-1.5 overflow-hidden">
                      <div className="h-full bg-purple-400/50 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-white font-body text-sm font-semibold">{count.toLocaleString()}</p>
                    <p className="text-white/30 font-body text-[10px]">{pct}% of blog traffic</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Newsletter history from blog perspective */}
      <div className="bg-[#111110] border border-white/8 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/8">
          <p className="text-white font-body font-semibold text-sm">Recent Newsletter Campaigns</p>
        </div>
        {stats.sends.filter(s => !s.testMode).length === 0 ? (
          <div className="p-8 text-center text-white/30 font-body text-xs">No campaigns sent yet</div>
        ) : (
          <div className="divide-y divide-white/5">
            {stats.sends.filter(s => !s.testMode).map(send => (
              <div key={send.id} className="flex items-center justify-between px-5 py-3">
                <div className="flex-1 min-w-0">
                  <p className="text-white font-body text-xs font-semibold truncate">{send.subject}</p>
                  <p className="text-white/30 font-body text-[10px] mt-0.5">
                    {new Date(send.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-green-400 font-body text-xs font-semibold">{send.sent} sent</p>
                  {send.failed > 0 && <p className="text-red-400 font-body text-[10px]">{send.failed} failed</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Newsletter Analytics ───────────────────────────────────────────────────
function NewsletterAnalytics({ secret }: { secret: string }) {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(() => {
    setLoading(true)
    adminFetch<StatsData>('/api/admin/stats', secret)
      .then(d => { if (d) setStats(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [secret])

  useEffect(() => { fetchData() }, [fetchData])

  if (loading) return <LoadingSpinner />
  if (!stats) return <ErrorMsg text="Failed to load newsletter analytics." />

  const allSends = stats.sends.filter(s => !s.testMode)
  const totalSent = allSends.reduce((s, c) => s + c.sent, 0)
  const totalFailed = allSends.reduce((s, c) => s + c.failed, 0)
  const deliveryRate = (totalSent + totalFailed) > 0
    ? Math.round((totalSent / (totalSent + totalFailed)) * 100)
    : 0
  const avgPerCampaign = allSends.length > 0 ? Math.round(totalSent / allSends.length) : 0

  const statCards = [
    { label: 'Subscribers', value: stats.totalSubscribers, icon: <Users size={16} />, sub: `+${stats.thisMonthSignups} this month`, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' },
    { label: 'Campaigns Sent', value: allSends.length, icon: <Send size={16} />, sub: 'total campaigns', color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/20' },
    { label: 'Emails Delivered', value: totalSent, icon: <TrendingUp size={16} />, sub: `${deliveryRate}% delivery rate`, color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20' },
    { label: 'Avg/Campaign', value: avgPerCampaign, icon: <BarChart2 size={16} />, sub: 'emails per send', color: 'text-brand-gold', bg: 'bg-brand-gold/10', border: 'border-brand-gold/20' },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className={`bg-[#111110] border ${card.border} rounded-2xl p-5`}>
            <div className={`w-8 h-8 rounded-xl ${card.bg} border ${card.border} flex items-center justify-center ${card.color} mb-3`}>
              {card.icon}
            </div>
            <p className="text-white font-heading font-bold text-3xl mb-0.5">{card.value.toLocaleString()}</p>
            <p className="text-white/60 font-body text-xs font-semibold">{card.label}</p>
            <p className="text-white/30 font-body text-xs mt-1">{card.sub}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subscriber growth chart */}
        <div className="bg-[#111110] border border-white/8 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white font-body font-semibold text-sm">Subscriber Growth</p>
              <p className="text-white/30 font-body text-xs mt-0.5">Last 14 days</p>
            </div>
            <span className="text-white/20 font-body text-xs">{stats.growth.reduce((s, g) => s + g.count, 0)} new</span>
          </div>
          <MiniBarChart data={stats.growth} color="brand-gold" />
        </div>

        {/* Sources */}
        <div className="bg-[#111110] border border-white/8 rounded-2xl p-5">
          <p className="text-white font-body font-semibold text-sm mb-4">Subscriber Sources</p>
          {Object.keys(stats.sources).length === 0 ? (
            <p className="text-white/30 font-body text-xs">No data yet</p>
          ) : (
            <div className="space-y-3">
              {Object.entries(stats.sources).sort(([, a], [, b]) => b - a).map(([source, count]) => {
                const pct = Math.round((count / stats.totalSubscribers) * 100)
                return (
                  <div key={source}>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-white/70 font-body text-xs">{source}</p>
                      <p className="text-white/40 font-body text-xs">{count} · {pct}%</p>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-gold/50 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* All campaigns */}
      <div className="bg-[#111110] border border-white/8 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/8 flex items-center justify-between">
          <p className="text-white font-body font-semibold text-sm">Campaign History</p>
          {allSends.length > 0 && (
            <span className="text-white/30 font-body text-xs">{allSends.length} campaigns · {totalSent.toLocaleString()} emails</span>
          )}
        </div>
        {allSends.length === 0 ? (
          <div className="p-8 text-center text-white/30 font-body text-xs">No campaigns sent yet — go to Newsletter tab to send your first one!</div>
        ) : (
          <div className="divide-y divide-white/5">
            {allSends.map(send => {
              const dr = (send.sent + send.failed) > 0 ? Math.round((send.sent / (send.sent + send.failed)) * 100) : 0
              return (
                <div key={send.id} className="px-5 py-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-body text-sm font-semibold truncate">{send.subject}</p>
                      <p className="text-white/30 font-body text-[10px] mt-0.5">
                        {new Date(send.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0 text-right">
                      <div>
                        <p className="text-green-400 font-body text-xs font-semibold">{send.sent} sent</p>
                        {send.failed > 0 && <p className="text-red-400 font-body text-[10px]">{send.failed} failed</p>}
                      </div>
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold font-body" style={{
                        background: `conic-gradient(#22c55e ${dr}%, rgba(255,255,255,0.05) 0)`,
                      }}>
                        <span className="bg-[#111110] w-7 h-7 rounded-full flex items-center justify-center text-[9px] text-green-400">{dr}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Recent subscribers */}
      <div className="bg-[#111110] border border-white/8 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/8">
          <p className="text-white font-body font-semibold text-sm">Recent Subscribers</p>
        </div>
        {stats.recentLeads.length === 0 ? (
          <div className="p-8 text-center text-white/30 font-body text-xs">No subscribers yet</div>
        ) : (
          <div className="divide-y divide-white/5">
            {stats.recentLeads.map(lead => (
              <div key={lead.id} className="flex items-center justify-between px-5 py-3">
                <div>
                  <p className="text-white font-body text-sm font-semibold">{lead.name}</p>
                  <p className="text-white/35 font-body text-xs">{lead.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-white/40 font-body text-xs">{lead.source}</p>
                  <p className="text-white/25 font-body text-[10px] mt-0.5">{lead.date}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Dashboard ────────────────────────────────────────────────────────────
function Dashboard({ secret }: { secret: string }) {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchStats = useCallback(() => {
    setLoading(true)
    Promise.all([
      adminFetch<StatsData>('/api/admin/stats', secret),
      adminFetch<AnalyticsData>('/api/admin/analytics', secret),
    ]).then(([s, a]) => {
      if (s) setStats(s)
      if (a) setAnalytics(a)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [secret])

  useEffect(() => { fetchStats() }, [fetchStats])

  if (loading) return <LoadingSpinner />
  if (!stats) return <ErrorMsg text="Failed to load stats." />

  const maxGrowth = Math.max(...stats.growth.map(g => g.count), 1)
  const totalGrowthInPeriod = stats.growth.reduce((s, g) => s + g.count, 0)

  const statCards = [
    { label: 'Total Subscribers', value: stats.totalSubscribers, icon: <Users size={18} />, sub: `+${stats.thisMonthSignups} this month`, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' },
    { label: 'Blog Posts', value: stats.totalBlogPosts, icon: <FileText size={18} />, sub: 'published on site', color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20' },
    { label: 'Emails Sent', value: stats.totalEmailsSent, icon: <Send size={18} />, sub: `${stats.totalSendCampaigns} campaigns`, color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/20' },
    { label: 'Page Views', value: analytics?.totalViews ?? 0, icon: <Eye size={18} />, sub: `${analytics?.todayViews ?? 0} today`, color: 'text-brand-gold', bg: 'bg-brand-gold/10', border: 'border-brand-gold/20' },
  ]

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className={`bg-[#111110] border ${card.border} rounded-2xl p-5`}>
            <div className={`w-9 h-9 rounded-xl ${card.bg} border ${card.border} flex items-center justify-center ${card.color} mb-3`}>
              {card.icon}
            </div>
            <p className="text-white font-heading font-bold text-3xl mb-0.5">{card.value.toLocaleString()}</p>
            <p className="text-white/60 font-body text-xs font-semibold">{card.label}</p>
            <p className="text-white/30 font-body text-xs mt-1">{card.sub}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* Growth chart */}
        <div className="bg-[#111110] border border-white/8 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-white font-body font-semibold text-sm">Subscriber Growth</p>
              <p className="text-white/30 font-body text-xs mt-0.5">Last 14 days</p>
            </div>
            <span className="text-white/20 font-body text-xs">{totalGrowthInPeriod} new signups</span>
          </div>
          <div className="flex items-end gap-1.5 h-32">
            {stats.growth.map((point, i) => {
              const pct = maxGrowth > 0 ? (point.count / maxGrowth) * 100 : 0
              const dayLabel = new Date(point.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
              return (
                <div key={point.date} className="flex-1 flex flex-col items-center gap-1 group">
                  <div className="relative w-full flex flex-col justify-end" style={{ height: '100px' }}>
                    <div
                      className="w-full bg-brand-gold/30 hover:bg-brand-gold/60 rounded-t-sm transition-all cursor-default relative"
                      style={{ height: `${Math.max(pct, point.count > 0 ? 8 : 2)}%` }}
                    >
                      {point.count > 0 && (
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-brand-gold text-brand-black font-body font-bold text-[9px] px-1.5 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {point.count}
                        </div>
                      )}
                    </div>
                  </div>
                  {(i % 3 === 0) && (
                    <p className="text-white/20 font-body text-[8px] whitespace-nowrap">{dayLabel}</p>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Sources breakdown */}
        <div className="bg-[#111110] border border-white/8 rounded-2xl p-5">
          <p className="text-white font-body font-semibold text-sm mb-4">Signup Sources</p>
          {Object.keys(stats.sources).length === 0 ? (
            <p className="text-white/30 font-body text-xs">No data yet</p>
          ) : (
            <div className="space-y-3">
              {Object.entries(stats.sources)
                .sort(([, a], [, b]) => b - a)
                .map(([source, count]) => {
                  const pct = Math.round((count / stats.totalSubscribers) * 100)
                  return (
                    <div key={source}>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-white/70 font-body text-xs">{source}</p>
                        <p className="text-white/40 font-body text-xs">{count} · {pct}%</p>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-gold/50 rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  )
                })}
            </div>
          )}
        </div>
      </div>

      {/* Website page views (last 30d) */}
      {analytics && (
        <div className="bg-[#111110] border border-white/8 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white font-body font-semibold text-sm">Website Page Views</p>
              <p className="text-white/30 font-body text-xs mt-0.5">Last 30 days · {analytics.last7Views} in past week</p>
            </div>
            <div className="flex gap-4">
              <div className="text-right">
                <p className="text-white font-body font-bold text-lg">{analytics.thisMonthViews.toLocaleString()}</p>
                <p className="text-white/30 font-body text-[10px]">this month</p>
              </div>
              <div className="text-right">
                <p className="text-white font-body font-bold text-lg">{analytics.todayViews.toLocaleString()}</p>
                <p className="text-white/30 font-body text-[10px]">today</p>
              </div>
            </div>
          </div>
          <MiniBarChart data={analytics.dailyViews} color="blue-400" />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent subscribers */}
        <div className="bg-[#111110] border border-white/8 rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/8">
            <p className="text-white font-body font-semibold text-sm">Recent Subscribers</p>
          </div>
          {stats.recentLeads.length === 0 ? (
            <div className="p-8 text-center text-white/30 font-body text-xs">No subscribers yet</div>
          ) : (
            <div className="divide-y divide-white/5">
              {stats.recentLeads.map(lead => (
                <div key={lead.id} className="flex items-center justify-between px-5 py-3">
                  <div>
                    <p className="text-white font-body text-sm font-semibold">{lead.name}</p>
                    <p className="text-white/35 font-body text-xs">{lead.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/40 font-body text-xs">{lead.source}</p>
                    <p className="text-white/25 font-body text-[10px] mt-0.5">{lead.date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Newsletter send history */}
        <div className="bg-[#111110] border border-white/8 rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/8">
            <p className="text-white font-body font-semibold text-sm">Newsletter History</p>
          </div>
          {stats.sends.length === 0 ? (
            <div className="p-8 text-center text-white/30 font-body text-xs">No campaigns sent yet</div>
          ) : (
            <div className="divide-y divide-white/5">
              {stats.sends.map(send => (
                <div key={send.id} className="px-5 py-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-body text-xs font-semibold truncate">{send.subject}</p>
                      <p className="text-white/30 font-body text-[10px] mt-0.5">
                        {new Date(send.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        {send.testMode && <span className="ml-2 text-yellow-400/60">TEST</span>}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-green-400 font-body text-xs font-semibold">{send.sent} sent</p>
                      {send.failed > 0 && <p className="text-red-400 font-body text-[10px]">{send.failed} failed</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Refresh */}
      <div className="flex justify-end">
        <button onClick={fetchStats} className="text-white/30 hover:text-white font-body text-xs transition-colors flex items-center gap-1.5">
          <span>↻</span> Refresh stats
        </button>
      </div>
    </div>
  )
}

// ── Blog Writer ─────────────────────────────────────────────────────────────
function BlogWriter({ secret }: { secret: string }) {
  const [topic, setTopic] = useState('')
  const [style, setStyle] = useState('Gen Z — punchy, direct, casual with emojis')
  const [selectedIdea, setSelectedIdea] = useState<ContentIdea | null>(null)
  const [category, setCategory] = useState('Founder Playbook')
  const [generating, setGenerating] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [result, setResult] = useState<{ content: string; title: string; slug: string } | null>(null)
  const [published, setPublished] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(true)

  const generate = async () => {
    if (!topic.trim()) { setError('Tell me what to write about first'); return }
    setGenerating(true); setError(''); setResult(null); setPublished(null)
    try {
      const data = await adminFetch<{ content: string; title: string; slug: string }>('/api/admin/generate-blog', secret, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, style, ideaPrompt: selectedIdea?.prompt }),
      })
      if (data) setResult(data)
    } catch (e) { setError(String(e)) } finally { setGenerating(false) }
  }

  const publish = async () => {
    if (!result) return
    setPublishing(true)
    try {
      const excerpt = result.content.replace(/^#.+\n/m, '').replace(/[#*`\n]/g, ' ').trim().slice(0, 160)
      const data = await adminFetch<{ url: string }>('/api/admin/publish-blog', secret, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: result.slug, title: result.title, content: result.content, category, excerpt }),
      })
      if (data) setPublished(data.url)
    } catch (e) { setError(String(e)) } finally { setPublishing(false) }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
      {/* Ideas sidebar */}
      <div className="space-y-2">
        <a
          href="/admin/blog"
          className="block text-center text-xs font-body font-bold text-brand-gold border border-brand-gold/30 rounded-xl px-3 py-2.5 mb-4 hover:bg-brand-gold/10 transition-colors"
        >
          Edit existing posts &amp; images →
        </a>
        <p className="text-white/40 text-xs font-body font-bold uppercase tracking-widest mb-3">Content Ideas</p>
        {blogIdeas.map(idea => (
          <button
            key={idea.id}
            onClick={() => { setSelectedIdea(idea); setTopic(idea.title.replace('[N]', String(Math.floor(Math.random() * 10) + 6)).replace('[X]', 'Your Topic').replace('[Unpopular Opinion]', 'Your Take')) }}
            className={`w-full text-left p-3 rounded-xl border transition-all text-sm font-body ${selectedIdea?.id === idea.id ? 'border-brand-gold bg-brand-gold/10 text-white' : 'border-white/8 bg-white/3 text-white/60 hover:border-white/20 hover:text-white'}`}
          >
            <span className="mr-2">{idea.emoji}</span>{idea.title}
          </button>
        ))}
      </div>

      {/* Editor */}
      <div className="space-y-4">
        <div className="bg-[#111110] border border-white/8 rounded-2xl p-5 space-y-4">
          <div>
            <label className="text-white/60 text-xs font-body font-semibold block mb-2">What should I write about?</label>
            <textarea
              value={topic}
              onChange={e => setTopic(e.target.value)}
              rows={3}
              placeholder="e.g. 'We had Pulsar call 50 inbound leads in one day — here's what happened'"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-body text-sm resize-none outline-none focus:border-brand-gold transition-colors placeholder:text-white/20"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-white/60 text-xs font-body font-semibold block mb-2">Style</label>
              <select value={style} onChange={e => setStyle(e.target.value)} className="w-full bg-[#1A1815] border border-white/10 text-white rounded-xl px-3 py-2 font-body text-sm outline-none focus:border-brand-gold">
                <option value="Gen Z — punchy, direct, casual with emojis">Gen Z / Casual</option>
                <option value="Professional but direct — no fluff, data-driven">Professional / Data</option>
                <option value="Storytelling — first-person founder story, emotional arc">Storytelling</option>
                <option value="Contrarian hot-take — challenge conventional wisdom">Hot Take</option>
              </select>
            </div>
            <div>
              <label className="text-white/60 text-xs font-body font-semibold block mb-2">Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-[#1A1815] border border-white/10 text-white rounded-xl px-3 py-2 font-body text-sm outline-none focus:border-brand-gold">
                {['GTM Experiments', 'Founder Mistakes', 'Comparisons', 'Founder Playbook', 'GTM Strategy', 'Marketing Automation'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          <button onClick={generate} disabled={generating || !topic.trim()} className="flex items-center gap-2 bg-brand-gold text-brand-black font-body font-bold rounded-full px-6 py-3 hover:bg-brand-gold-dim transition-all disabled:opacity-40 disabled:cursor-not-allowed">
            {generating ? 'Generating…' : 'Generate with Claude'}
          </button>
          {error && <p className="text-red-400 text-sm font-body">❌ {error}</p>}
        </div>

        <AnimatePresence>
          {result && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-[#111110] border border-white/8 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/8">
                <div>
                  <p className="text-white font-body font-semibold text-sm">{result.title}</p>
                  <p className="text-white/40 text-xs font-body mt-0.5">slug: /blog/{result.slug}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <button onClick={() => setExpanded(e => !e)} className="text-white/30 hover:text-white transition-colors">
                    {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  <button onClick={() => { navigator.clipboard.writeText(result.content); setCopied(true); setTimeout(() => setCopied(false), 2000) }} className="text-white/60 hover:text-white font-body text-xs font-semibold border border-white/10 rounded-lg px-3 py-1.5 transition-colors">
                    {copied ? '✅ Copied' : '📋 Copy MDX'}
                  </button>
                  <button onClick={publish} disabled={publishing} className="bg-green-500/20 border border-green-500/30 text-green-400 font-body text-xs font-semibold rounded-lg px-3 py-1.5 hover:bg-green-500/30 transition-all disabled:opacity-40">
                    {publishing ? '⏳ Saving...' : '🚀 Save to Blog'}
                  </button>
                </div>
              </div>
              {expanded && (
                <div className="p-5 max-h-[500px] overflow-y-auto">
                  <pre className="text-white/70 font-mono text-xs whitespace-pre-wrap leading-relaxed">{result.content}</pre>
                </div>
              )}
              {published && (
                <div className="px-5 py-3 bg-green-500/10 border-t border-green-500/20">
                  <p className="text-green-400 text-sm font-body">✅ Saved to <code className="bg-white/5 px-1 rounded">{published}</code> — run <code className="bg-white/5 px-1 rounded">vercel --prod</code> to publish live</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// ── Newsletter ──────────────────────────────────────────────────────────────
function NewsletterComposer({ secret }: { secret: string }) {
  const [topic, setTopic] = useState('')
  const [selectedIdea, setSelectedIdea] = useState<ContentIdea | null>(null)
  const [generating, setGenerating] = useState(false)
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState<{ subject: string; body: string } | null>(null)
  const [editedSubject, setEditedSubject] = useState('')
  const [error, setError] = useState('')
  const [sendResult, setSendResult] = useState<{ sent: number; failed: number } | null>(null)
  const [testEmail, setTestEmail] = useState('')
  const [showSendConfirm, setShowSendConfirm] = useState(false)
  const [leadCount, setLeadCount] = useState(0)

  useEffect(() => {
    adminFetch<Lead[]>('/api/admin/leads', secret)
      .then(d => setLeadCount(Array.isArray(d) ? d.length : 0))
      .catch(() => {})
  }, [secret])

  const generate = async () => {
    if (!topic.trim()) { setError('What should this newsletter be about?'); return }
    setGenerating(true); setError(''); setResult(null); setSendResult(null)
    try {
      const data = await adminFetch<{ subject: string; body: string }>('/api/admin/generate-newsletter', secret, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, ideaPrompt: selectedIdea?.prompt }),
      })
      if (data) { setResult(data); setEditedSubject(data.subject) }
    } catch (e) { setError(String(e)) } finally { setGenerating(false) }
  }

  const sendTest = async () => {
    if (!result || !testEmail) return
    setSending(true)
    try {
      const data = await adminFetch<{ sent: number; failed: number }>('/api/admin/send-newsletter', secret, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject: editedSubject, body: result.body, testMode: true, testEmail }),
      })
      if (data) setSendResult(data)
    } catch (e) { setError(String(e)) } finally { setSending(false) }
  }

  const sendAll = async () => {
    if (!result) return
    setSending(true); setShowSendConfirm(false)
    try {
      const data = await adminFetch<{ sent: number; failed: number }>('/api/admin/send-newsletter', secret, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject: editedSubject, body: result.body }),
      })
      if (data) setSendResult(data)
    } catch (e) { setError(String(e)) } finally { setSending(false) }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
      <div className="space-y-2">
        <p className="text-white/40 text-xs font-body font-bold uppercase tracking-widest mb-3">Newsletter Ideas</p>
        {newsletterIdeas.map(idea => (
          <button key={idea.id} onClick={() => { setSelectedIdea(idea); setTopic(idea.title.replace('[Name]', 'a founder')) }} className={`w-full text-left p-3 rounded-xl border transition-all text-sm font-body ${selectedIdea?.id === idea.id ? 'border-brand-gold bg-brand-gold/10 text-white' : 'border-white/8 bg-white/3 text-white/60 hover:border-white/20 hover:text-white'}`}>
            <span className="mr-2">{idea.emoji}</span>{idea.title}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <div className="bg-[#111110] border border-white/8 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2 text-white/40 text-xs font-body">
            <span>{leadCount} subscribers</span>
          </div>
          <div>
            <label className="text-white/60 text-xs font-body font-semibold block mb-2">What&apos;s this newsletter about?</label>
            <textarea value={topic} onChange={e => setTopic(e.target.value)} rows={3} placeholder="e.g. 'why cold calling is back in 2026'" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-body text-sm resize-none outline-none focus:border-brand-gold transition-colors placeholder:text-white/20" />
          </div>
          <button onClick={generate} disabled={generating || !topic.trim()} className="flex items-center gap-2 bg-brand-gold text-brand-black font-body font-bold rounded-full px-6 py-3 hover:bg-brand-gold-dim transition-all disabled:opacity-40">
            {generating ? 'Generating…' : 'Generate Newsletter'}
          </button>
          {error && <p className="text-red-400 text-sm font-body">❌ {error}</p>}
        </div>

        <AnimatePresence>
          {result && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-[#111110] border border-white/8 rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-white/8">
                <label className="text-white/40 text-xs font-body block mb-1">Subject line</label>
                <input value={editedSubject} onChange={e => setEditedSubject(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white font-body text-sm outline-none focus:border-brand-gold transition-colors" />
              </div>
              <div className="p-5 max-h-[360px] overflow-y-auto">
                <p className="text-white/40 text-xs font-body mb-3">HTML preview</p>
                <div className="bg-white/3 rounded-xl p-4 text-white/70 text-xs font-mono whitespace-pre-wrap leading-relaxed max-h-[280px] overflow-y-auto">{result.body}</div>
              </div>
              <div className="px-5 py-4 border-t border-white/8 space-y-3">
                <div className="flex gap-2">
                  <input value={testEmail} onChange={e => setTestEmail(e.target.value)} placeholder="your@email.com (test)" className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white font-body text-sm outline-none focus:border-brand-gold placeholder:text-white/20" />
                  <button onClick={sendTest} disabled={sending || !testEmail} className="border border-white/20 text-white/70 font-body font-semibold text-sm rounded-xl px-4 py-2 hover:border-brand-gold hover:text-white transition-all disabled:opacity-40">
                    {sending ? '⏳' : '📨 Test'}
                  </button>
                </div>
                {!showSendConfirm ? (
                  <button onClick={() => setShowSendConfirm(true)} disabled={sending} className="w-full bg-brand-gold text-brand-black font-body font-bold rounded-xl py-3 hover:bg-brand-gold-dim transition-all disabled:opacity-40">
                    🚀 Send to all {leadCount} subscribers
                  </button>
                ) : (
                  <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
                    <p className="text-orange-400 font-body text-sm mb-3">fr fr sending to {leadCount} people — you sure? 👀</p>
                    <div className="flex gap-2">
                      <button onClick={sendAll} disabled={sending} className="flex-1 bg-orange-500 text-white font-body font-bold rounded-lg py-2 text-sm hover:bg-orange-600">
                        {sending ? '⏳ Sending...' : 'Yes, send it 🔥'}
                      </button>
                      <button onClick={() => setShowSendConfirm(false)} className="flex-1 border border-white/10 text-white/60 font-body font-semibold rounded-lg py-2 text-sm hover:text-white">
                        nvm, wait
                      </button>
                    </div>
                  </div>
                )}
                {sendResult && (
                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3">
                    <p className="text-green-400 text-sm font-body">✅ Sent: {sendResult.sent} · Failed: {sendResult.failed}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// ── Leads Manager ───────────────────────────────────────────────────────────
function LeadsManager({ secret }: { secret: string }) {
  const [leads, setLeads] = useState<Lead[]>([])
  const [form, setForm] = useState({ name: '', email: '', source: 'Manual', tags: '' })
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [search, setSearch] = useState('')

  const fetchLeads = useCallback(() => {
    adminFetch<Lead[]>('/api/admin/leads', secret)
      .then(d => { setLeads(Array.isArray(d) ? d : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [secret])

  useEffect(() => { fetchLeads() }, [fetchLeads])

  const add = async () => {
    if (!form.name || !form.email) return
    setAdding(true)
    await adminFetch('/api/admin/leads', secret, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) }),
    }).catch(() => {})
    setForm({ name: '', email: '', source: 'Manual', tags: '' })
    fetchLeads(); setAdding(false)
  }

  const remove = async (id: string) => {
    await adminFetch('/api/admin/leads', secret, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    }).catch(() => {})
    fetchLeads()
  }

  const filtered = leads.filter(l =>
    search === '' || l.name.toLowerCase().includes(search.toLowerCase()) || l.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="bg-[#111110] border border-white/8 rounded-2xl p-5">
        <p className="text-white font-body font-semibold mb-4">Add Lead Manually</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
          {[
            { key: 'name', placeholder: 'Full Name' },
            { key: 'email', placeholder: 'email@company.com' },
            { key: 'source', placeholder: 'Source' },
            { key: 'tags', placeholder: 'Tags (comma-separated)' },
          ].map(f => (
            <input key={f.key} value={form[f.key as keyof typeof form]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white font-body text-sm outline-none focus:border-brand-gold transition-colors placeholder:text-white/20" />
          ))}
        </div>
        <button onClick={add} disabled={adding || !form.name || !form.email} className="bg-brand-gold text-brand-black font-body font-bold rounded-full px-5 py-2 text-sm hover:bg-brand-gold-dim transition-all disabled:opacity-40">
          {adding ? '⏳ Adding...' : '+ Add Lead'}
        </button>
      </div>

      <div className="bg-[#111110] border border-white/8 rounded-2xl overflow-hidden">
        <div className="px-5 py-3 border-b border-white/8 flex items-center justify-between gap-3">
          <p className="text-white font-body font-semibold">{leads.length} subscribers</p>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or email…" className="flex-1 max-w-xs bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-white font-body text-xs outline-none focus:border-brand-gold placeholder:text-white/20" />
        </div>
        {loading ? (
          <div className="p-8 text-center text-white/40 font-body text-sm">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-white/40 font-body text-sm">{search ? 'No results' : 'No leads yet 😅 add some above'}</div>
        ) : (
          <div className="divide-y divide-white/5 max-h-[480px] overflow-y-auto">
            {[...filtered].reverse().map(lead => (
              <div key={lead.id} className="flex items-center justify-between px-5 py-3 hover:bg-white/2">
                <div>
                  <p className="text-white font-body text-sm font-semibold">{lead.name}</p>
                  <p className="text-white/40 font-body text-xs">{lead.email} · {lead.source} · {lead.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {lead.tags.map(t => <span key={t} className="text-brand-gold bg-brand-gold/10 text-[10px] font-bold px-2 py-0.5 rounded-full">{t}</span>)}
                  </div>
                  <button onClick={() => remove(lead.id)} className="text-red-400/60 hover:text-red-400 text-xs font-body transition-colors">remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Shared helpers ──────────────────────────────────────────────────────────
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="text-center">
        <div className="text-3xl mb-3 animate-bounce">⚡</div>
        <p className="text-white/40 font-body text-sm">Loading...</p>
      </div>
    </div>
  )
}

function ErrorMsg({ text }: { text: string }) {
  return <p className="text-red-400 font-body text-sm">{text}</p>
}

// ── Main Admin Page ─────────────────────────────────────────────────────────
export default function AdminPage() {
  const { secret, setSecret, verifying } = useAdminAuth()
  const [tab, setTab] = useState<'dashboard' | 'website' | 'blog-analytics' | 'nl-analytics' | 'blog' | 'newsletter' | 'leads'>('dashboard')

  if (verifying) return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
      <div className="text-center">
        <div className="text-3xl mb-3 animate-bounce">⚡</div>
        <p className="text-white/40 font-body text-sm">Authenticating...</p>
      </div>
    </div>
  )

  if (!secret) return <AuthGate onAuth={setSecret} />

  const tabs = [
    { id: 'dashboard', label: 'Overview', key: 'dashboard' as const },
    { id: 'website', label: 'Website', key: 'website' as const },
    { id: 'blog-analytics', label: 'Blog', key: 'blog-analytics' as const },
    { id: 'nl-analytics', label: 'Newsletter', key: 'nl-analytics' as const },
    { id: 'blog', label: 'Write', key: 'blog' as const },
    { id: 'newsletter', label: 'Send', key: 'newsletter' as const },
    { id: 'leads', label: 'Leads', key: 'leads' as const },
  ]

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Header */}
      <div className="bg-[#111110] border-b border-white/5 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-brand-gold font-heading font-bold text-lg">nebulaa admin</span>
            <span className="text-white/20 text-xs font-body hidden sm:block">content studio</span>
          </div>
          <div className="flex gap-0.5 bg-white/5 rounded-full p-1 overflow-x-auto max-w-[calc(100vw-12rem)]">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.key)} className={`font-body text-xs font-semibold rounded-full px-3 py-1.5 transition-all whitespace-nowrap ${tab === t.key ? 'bg-brand-gold text-brand-black' : 'text-white/50 hover:text-white'}`}>
                {t.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <a href="/admin/media" className="text-white/40 hover:text-brand-gold font-body text-xs transition-colors whitespace-nowrap">
              media slots
            </a>
            <button onClick={() => { sessionStorage.removeItem('admin_secret'); setSecret(null) }} className="text-white/30 hover:text-white/60 font-body text-xs transition-colors">
              logout
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            {tab === 'dashboard' && <Dashboard secret={secret} />}
            {tab === 'website' && <WebsiteAnalytics secret={secret} />}
            {tab === 'blog-analytics' && <BlogAnalytics secret={secret} />}
            {tab === 'nl-analytics' && <NewsletterAnalytics secret={secret} />}
            {tab === 'blog' && <BlogWriter secret={secret} />}
            {tab === 'newsletter' && <NewsletterComposer secret={secret} />}
            {tab === 'leads' && <LeadsManager secret={secret} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
