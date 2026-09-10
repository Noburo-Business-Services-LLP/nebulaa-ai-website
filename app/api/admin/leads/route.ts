import { NextRequest, NextResponse } from 'next/server'
import { readLeads, tryPersistLeads } from '@/lib/leadStore'

function checkAuth(req: NextRequest) {
  const secret = req.headers.get('x-admin-secret')
  return secret?.trim() === process.env.ADMIN_SECRET?.trim()
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const leads = readLeads()
  return NextResponse.json(leads)
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { name, email, source, tags } = await req.json()
  if (!name || !email) return NextResponse.json({ error: 'Name and email required' }, { status: 400 })
  const leads = readLeads()
  const newLead = {
    id: Date.now().toString(),
    name,
    email,
    source: source || 'Manual',
    date: new Date().toISOString().split('T')[0],
    tags: tags || [],
  }
  leads.push(newLead)
  if (!tryPersistLeads(leads)) {
    return NextResponse.json(
      { error: 'Read-only filesystem — lead not saved. See LEAD_STORAGE note in leadStore.ts.' },
      { status: 503 },
    )
  }
  return NextResponse.json(newLead)
}

export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await req.json()
  const leads = readLeads()
  const filtered = leads.filter((l: { id: string }) => l.id !== id)
  if (!tryPersistLeads(filtered)) {
    return NextResponse.json(
      { error: 'Read-only filesystem — deletion not saved.' },
      { status: 503 },
    )
  }
  return NextResponse.json({ success: true })
}
