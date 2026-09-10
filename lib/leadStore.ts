import fs from 'fs'
import path from 'path'
import { createTransport } from '@/lib/mailer'

export interface Lead {
  id: string
  name: string
  email: string
  source: string
  date: string
  tags: string[]
}

const leadsPath = () => path.join(process.cwd(), 'data', 'leads.json')

/**
 * Reads the local lead file. On a read-only host this still works — the file
 * is bundled at build time — it just won't contain anything captured in
 * production, which is what `notifyLead` exists to cover.
 */
export function readLeads(): Lead[] {
  try {
    return JSON.parse(fs.readFileSync(leadsPath(), 'utf8'))
  } catch {
    return []
  }
}

/**
 * Persist to disk where the filesystem allows it (local dev, a VM, a container
 * with a volume). Serverless hosts mount the app read-only, so this is a
 * best-effort write and never the only copy of a lead — see `notifyLead`.
 */
export function tryPersistLeads(leads: Lead[]): boolean {
  try {
    fs.writeFileSync(leadsPath(), JSON.stringify(leads, null, 2))
    return true
  } catch {
    return false
  }
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
          ? 'Also written to data/leads.json.'
          : 'NOT written to disk (read-only filesystem) — this email is the only record.',
      ].join('\n'),
    })
    return true
  } catch {
    return false
  }
}
