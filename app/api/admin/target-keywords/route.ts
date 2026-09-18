import { NextRequest, NextResponse } from 'next/server'
import { isAdmin } from '@/lib/adminAuth'
import { getTargetKeywords, setTargetKeyword } from '@/lib/targetKeywords'

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const keywords = await getTargetKeywords()
  return NextResponse.json({ keywords })
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { path, keyword } = await req.json()
  if (typeof path !== 'string' || typeof keyword !== 'string') {
    return NextResponse.json({ error: 'path and keyword are required' }, { status: 400 })
  }
  const ok = await setTargetKeyword(path, keyword)
  if (!ok) return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  return NextResponse.json({ ok: true })
}
