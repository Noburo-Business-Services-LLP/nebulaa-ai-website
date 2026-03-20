import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

function checkAuth(req: NextRequest) {
  const secret = req.headers.get('x-admin-secret')
  return secret?.trim() === process.env.ADMIN_SECRET?.trim()
}

const leadsPath = () => path.join(process.cwd(), 'data', 'leads.json')

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const leads = JSON.parse(fs.readFileSync(leadsPath(), 'utf8'))
  return NextResponse.json(leads)
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { name, email, source, tags } = await req.json()
  if (!name || !email) return NextResponse.json({ error: 'Name and email required' }, { status: 400 })
  const leads = JSON.parse(fs.readFileSync(leadsPath(), 'utf8'))
  const newLead = {
    id: Date.now().toString(),
    name,
    email,
    source: source || 'Manual',
    date: new Date().toISOString().split('T')[0],
    tags: tags || [],
  }
  leads.push(newLead)
  fs.writeFileSync(leadsPath(), JSON.stringify(leads, null, 2))
  return NextResponse.json(newLead)
}

export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await req.json()
  const leads = JSON.parse(fs.readFileSync(leadsPath(), 'utf8'))
  const filtered = leads.filter((l: { id: string }) => l.id !== id)
  fs.writeFileSync(leadsPath(), JSON.stringify(filtered, null, 2))
  return NextResponse.json({ success: true })
}
