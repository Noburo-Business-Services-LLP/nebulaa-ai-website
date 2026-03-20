import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

function checkAuth(req: NextRequest) {
  const secret = req.headers.get('x-admin-secret')
  return secret?.trim() === process.env.ADMIN_SECRET?.trim()
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const cwd = process.cwd()

  // Leads / subscribers
  const leadsPath = path.join(cwd, 'data', 'leads.json')
  const leads: { id: string; name: string; email: string; source: string; date: string; tags: string[] }[] =
    fs.existsSync(leadsPath) ? JSON.parse(fs.readFileSync(leadsPath, 'utf8')) : []

  // Newsletter send history
  const sendsPath = path.join(cwd, 'data', 'sends.json')
  const sends: { id: string; subject: string; date: string; sent: number; failed: number; totalLeads: number; testMode: boolean }[] =
    fs.existsSync(sendsPath) ? JSON.parse(fs.readFileSync(sendsPath, 'utf8')) : []

  // Blog posts
  const blogDir = path.join(cwd, 'content', 'blog')
  const blogFiles = fs.existsSync(blogDir) ? fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx')) : []

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
    totalBlogPosts: blogFiles.length,
    totalEmailsSent: totalSent,
    totalSendCampaigns: sends.filter(s => !s.testMode).length,
    growth,
    sources,
    recentLeads,
    sends: sends.slice(0, 10),
  })
}
