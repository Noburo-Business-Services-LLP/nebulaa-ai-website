import { NextRequest, NextResponse } from 'next/server'
import { isAdmin } from '@/lib/adminAuth'
import { runAudit, getLastAudit } from '@/lib/seoAudit'

/** GET returns the last stored audit — fast, no crawling. */
export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const audit = await getLastAudit()
  return NextResponse.json({ audit })
}

/**
 * POST runs a fresh crawl of every page the sitemap lists and stores the
 * result. Admin-triggered only — this is a real crawl of the live site,
 * not something to run on every dashboard page load.
 */
export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const audit = await runAudit()
    return NextResponse.json({ audit })
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Audit failed' }, { status: 500 })
  }
}
