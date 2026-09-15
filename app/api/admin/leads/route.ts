import { NextRequest, NextResponse } from 'next/server'
import { isAdmin } from '@/lib/adminAuth'
import { readLeads, tryPersistLeads } from '@/lib/leadStore'

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const leads = await readLeads()
  return NextResponse.json(leads)
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { name, email, source, tags } = await req.json()
  if (!name || !email) return NextResponse.json({ error: 'Name and email required' }, { status: 400 })
  const leads = await readLeads()
  const newLead = {
    id: Date.now().toString(),
    name,
    email,
    source: source || 'Manual',
    date: new Date().toISOString().split('T')[0],
    tags: tags || [],
  }
  leads.push(newLead)
  if (!(await tryPersistLeads(leads))) {
    return NextResponse.json(
      { error: 'Lead store unavailable — lead not saved.' },
      { status: 503 },
    )
  }
  return NextResponse.json(newLead)
}

export async function DELETE(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await req.json()
  const leads = await readLeads()
  const filtered = leads.filter((l: { id: string }) => l.id !== id)
  if (!(await tryPersistLeads(filtered))) {
    return NextResponse.json(
      { error: 'Lead store unavailable — deletion not saved.' },
      { status: 503 },
    )
  }
  return NextResponse.json({ success: true })
}
