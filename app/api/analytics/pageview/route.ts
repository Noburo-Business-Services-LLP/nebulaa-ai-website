import { NextRequest, NextResponse } from 'next/server'
import { appendPageView, today, type PageView } from '@/lib/analyticsStore'

export async function POST(req: NextRequest) {
  try {
    const { page, referrer } = await req.json()
    if (!page || typeof page !== 'string') {
      return NextResponse.json({ ok: false }, { status: 400 })
    }

    const entry: PageView = {
      page: page.slice(0, 200),
      date: today(),
      referrer: (referrer || '').slice(0, 200),
      ua: (req.headers.get('user-agent') || '').slice(0, 100),
    }

    await appendPageView(entry)

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
