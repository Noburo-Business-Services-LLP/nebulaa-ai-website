import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const leadsPath = () => path.join(process.cwd(), 'data', 'leads.json')

export async function POST(req: NextRequest) {
  const { name, email, source } = await req.json()

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
  }

  const leads = JSON.parse(fs.readFileSync(leadsPath(), 'utf8'))

  // Check for duplicate email
  const exists = leads.some((l: { email: string }) => l.email.toLowerCase() === email.toLowerCase())
  if (exists) {
    return NextResponse.json({ success: true, message: 'already_subscribed' })
  }

  const newLead = {
    id: Date.now().toString(),
    name: name || email.split('@')[0],
    email,
    source: source || 'Newsletter Signup',
    date: new Date().toISOString().split('T')[0],
    tags: ['newsletter'],
  }

  leads.push(newLead)
  fs.writeFileSync(leadsPath(), JSON.stringify(leads, null, 2))

  return NextResponse.json({ success: true, message: 'subscribed' })
}
