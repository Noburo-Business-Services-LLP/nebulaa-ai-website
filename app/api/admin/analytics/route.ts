import { NextRequest, NextResponse } from 'next/server'
import { isAdmin } from '@/lib/adminAuth'
import { readPageViews } from '@/lib/analyticsStore'

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Sixty days covers the dashboard's widest window (this month vs last).
  const views = await readPageViews(60)

  const today = new Date()

  // Last 30 days of daily page views
  const dailyViews: { date: string; count: number }[] = []
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().split('T')[0]
    dailyViews.push({ date: dateStr, count: views.filter(v => v.date === dateStr).length })
  }

  // Top pages
  const pageCounts: Record<string, number> = {}
  for (const v of views) {
    pageCounts[v.page] = (pageCounts[v.page] || 0) + 1
  }
  const topPages = Object.entries(pageCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([page, count]) => ({ page, count }))

  // Referrer breakdown
  const refCounts: Record<string, number> = {}
  for (const v of views) {
    const ref = v.referrer
      ? (v.referrer.includes('google') ? 'Google'
        : v.referrer.includes('linkedin') ? 'LinkedIn'
        : v.referrer.includes('twitter') || v.referrer.includes('x.com') ? 'Twitter/X'
        : v.referrer.includes('facebook') ? 'Facebook'
        : 'Direct / Other')
      : 'Direct / Other'
    refCounts[ref] = (refCounts[ref] || 0) + 1
  }

  const thisMonthStr = today.toISOString().slice(0, 7)
  const lastMonthDate = new Date(today)
  lastMonthDate.setMonth(lastMonthDate.getMonth() - 1)
  const lastMonthStr = lastMonthDate.toISOString().slice(0, 7)

  const thisMonthViews = views.filter(v => v.date?.startsWith(thisMonthStr)).length
  const lastMonthViews = views.filter(v => v.date?.startsWith(lastMonthStr)).length

  // Today's views
  const todayStr = today.toISOString().split('T')[0]
  const todayViews = views.filter(v => v.date === todayStr).length

  // Last 7 days
  const sevenDaysAgo = new Date(today)
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  const last7Views = views.filter(v => new Date(v.date) >= sevenDaysAgo).length

  return NextResponse.json({
    totalViews: views.length,
    todayViews,
    last7Views,
    thisMonthViews,
    lastMonthViews,
    dailyViews,
    topPages,
    referrers: Object.entries(refCounts)
      .sort(([, a], [, b]) => b - a)
      .map(([ref, count]) => ({ ref, count })),
  })
}
