import { NextRequest, NextResponse } from 'next/server'
import { isAdmin } from '@/lib/adminAuth'
import { getTrafficSummary } from '@/lib/googleAnalytics'

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const traffic = await getTrafficSummary()
  return NextResponse.json({ traffic })
}
