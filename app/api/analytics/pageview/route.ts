import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

interface PageView {
  page: string
  date: string
  referrer: string
  ua: string
}

const analyticsPath = () => path.join(process.cwd(), 'data', 'analytics.json')

export async function POST(req: NextRequest) {
  try {
    const { page, referrer } = await req.json()
    if (!page || typeof page !== 'string') {
      return NextResponse.json({ ok: false }, { status: 400 })
    }

    const filePath = analyticsPath()
    const views: PageView[] = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, 'utf8'))
      : []

    const entry: PageView = {
      page: page.slice(0, 200),
      date: new Date().toISOString().split('T')[0],
      referrer: (referrer || '').slice(0, 200),
      ua: (req.headers.get('user-agent') || '').slice(0, 100),
    }

    views.push(entry)

    // Keep last 10,000 entries to avoid unbounded growth
    const trimmed = views.slice(-10000)
    fs.writeFileSync(filePath, JSON.stringify(trimmed, null, 2))

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
