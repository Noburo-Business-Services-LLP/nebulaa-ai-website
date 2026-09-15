import { readJson, writeJson, isRemote } from '@/lib/s3Store'
import { createTransport } from '@/lib/mailer'

export interface Lead {
  id: string
  name: string
  email: string
  source: string
  date: string
  tags: string[]
}

const LEADS_KEY = 'leads.json'

/** Every captured lead. S3 in production, `data/leads.json` locally. */
export async function readLeads(): Promise<Lead[]> {
  return readJson<Lead[]>(LEADS_KEY, [])
}

/**
 * Persist the lead list. This is now a durable write rather than the
 * best-effort one it used to be, but `notifyLead` still runs on every signup:
 * S3 can fail too, and a lead is worth two copies.
 */
export async function tryPersistLeads(leads: Lead[]): Promise<boolean> {
  return writeJson(LEADS_KEY, leads)
}

/**
 * Email the lead to the team. This is the copy that survives on a read-only
 * host, so a signup is never silently dropped.
 */
export async function notifyLead(lead: Lead, persisted: boolean): Promise<boolean> {
  const to = process.env.LEADS_NOTIFY_TO || 'hello@nebulaa.ai'
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return false

  try {
    const transport = createTransport()
    await transport.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      subject: `New lead — ${lead.email}`,
      text: [
        `Email:  ${lead.email}`,
        `Name:   ${lead.name}`,
        `Source: ${lead.source}`,
        `Date:   ${lead.date}`,
        '',
        persisted
          ? `Also stored in ${isRemote() ? 'S3' : 'data/leads.json'}.`
          : 'NOT stored — this email is the only record. Check the lead store.',
      ].join('\n'),
    })
    return true
  } catch {
    return false
  }
}
