import { NextRequest, NextResponse } from 'next/server'
import { isAdmin } from '@/lib/adminAuth'
import { getIndexingStatus, getSearchPerformance } from '@/lib/googleSearchConsole'

/**
 * Indexing status inspects every sitemap URL individually against the
 * URL Inspection API, which is slow (one metered Google API call per page,
 * run sequentially to stay well inside its burst quota) — this is a
 * deliberately on-demand check, not something to run on every dashboard
 * load the way the on-page crawler's cached result is.
 */
export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const [indexing, performance] = await Promise.all([getIndexingStatus(), getSearchPerformance()])
  return NextResponse.json({ indexing, performance })
}
