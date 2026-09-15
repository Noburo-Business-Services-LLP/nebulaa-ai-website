import { NextRequest, NextResponse } from 'next/server'
import { isAdmin } from '@/lib/adminAuth'
import { readLeads } from '@/lib/leadStore'
import { readJson } from '@/lib/s3Store'
import { blogPosts } from '@/lib/blogData'
import { listPublishedPosts } from '@/lib/blogStore'

interface SendRecord {
  id: string
  subject: string
  date: string
  sent: number
  failed: number
  totalLeads: number
  testMode: boolean
}

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Leads / subscribers
  const leads = await readLeads()

  // Newsletter send history
  const sends = await readJson<SendRecord[]>('sends.json', [])

  // Blog posts — the ones compiled into the repo, plus anything published
  // through the admin page since the last deploy.
  const published = await listPublishedPosts()
  const repoSlugs = new Set(blogPosts.map(p => p.slug))
  const totalPosts = blogPosts.length + published.filter(p => !repoSlugs.has(p.slug)).length

  // Subscriber growth — last 14 days
  const today = new Date()
  const growth: { date: string; count: number }[] = []
  for (let i = 13; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().split('T')[0]
    const count = leads.filter(l => l.date === dateStr).length
    growth.push({ date: dateStr, count })
  }

  // Sources breakdown
  const sources: Record<string, number> = {}
  for (const lead of leads) {
    const s = lead.source || 'Unknown'
    sources[s] = (sources[s] || 0) + 1
  }

  // This month signups
  const thisMonth = today.toISOString().slice(0, 7) // "YYYY-MM"
  const thisMonthCount = leads.filter(l => l.date?.startsWith(thisMonth)).length

  // Recent leads (last 10)
  const recentLeads = [...leads].reverse().slice(0, 10)

  // Total emails sent (non-test)
  const totalSent = sends.filter(s => !s.testMode).reduce((sum, s) => sum + s.sent, 0)

  return NextResponse.json({
    totalSubscribers: leads.length,
    thisMonthSignups: thisMonthCount,
    totalBlogPosts: totalPosts,
    totalEmailsSent: totalSent,
    totalSendCampaigns: sends.filter(s => !s.testMode).length,
    growth,
    sources,
    recentLeads,
    sends: sends.slice(0, 10),
  })
}
