import { NextRequest, NextResponse } from 'next/server'
import { readLeads, tryPersistLeads, notifyLead, type Lead } from '@/lib/leadStore'

export async function POST(req: NextRequest) {
  const { name, email, source } = await req.json()

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
  }

  const leads = await readLeads()

  if (leads.some(l => l.email.toLowerCase() === email.toLowerCase())) {
    return NextResponse.json({ success: true, message: 'already_subscribed' })
  }

  const lead: Lead = {
    id: Date.now().toString(),
    name: name || email.split('@')[0],
    email,
    source: source || 'Newsletter Signup',
    date: new Date().toISOString().split('T')[0],
    tags: ['newsletter'],
  }

  // Store the lead, and email it either way. Two independent copies, because
  // a signup that reaches neither is a lost customer.
  const persisted = await tryPersistLeads([...leads, lead])
  const notified = await notifyLead(lead, persisted)

  if (!persisted && !notified) {
    return NextResponse.json(
      { error: 'Could not record signup. Please email hello@nebulaa.ai.' },
      { status: 500 },
    )
  }

  return NextResponse.json({ success: true, message: 'subscribed' })
}
