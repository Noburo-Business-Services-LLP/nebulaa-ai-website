import { NextRequest, NextResponse } from 'next/server'
import { isAdmin } from '@/lib/adminAuth'
import { createTransport, buildNewsletterHTML } from '@/lib/mailer'
import { readLeads } from '@/lib/leadStore'
import { readJson, writeJson } from '@/lib/s3Store'

interface SendRecord {
  id: string
  subject: string
  date: string
  sent: number
  failed: number
  totalLeads: number
  testMode: boolean
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { subject, body, testMode, testEmail } = await req.json()

  if (!subject || !body) {
    return NextResponse.json({ error: 'Subject and body are required' }, { status: 400 })
  }

  const leads = await readLeads()

  const html = buildNewsletterHTML(subject, body)
  const transport = createTransport()

  const results = { sent: 0, failed: 0, errors: [] as string[] }

  if (testMode && testEmail) {
    // Send only to test email
    try {
      await transport.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: testEmail,
        subject: `[TEST] ${subject}`,
        html,
      })
      results.sent = 1
    } catch (err) {
      results.failed = 1
      results.errors.push(String(err))
    }
  } else {
    // Send to all leads
    for (const lead of leads) {
      try {
        const personalizedHtml = html.replace(/Hi there/g, `Hi ${lead.name.split(' ')[0]}`)
        await transport.sendMail({
          from: process.env.SMTP_FROM || process.env.SMTP_USER,
          to: lead.email,
          subject,
          html: personalizedHtml,
        })
        results.sent++
        // Small delay to avoid rate limiting
        await new Promise(r => setTimeout(r, 200))
      } catch (err) {
        results.failed++
        results.errors.push(`${lead.email}: ${String(err)}`)
      }
    }
  }

  // Log send history
  const sends = await readJson<SendRecord[]>('sends.json', [])
  sends.unshift({
    id: Date.now().toString(),
    subject: testMode ? `[TEST] ${subject}` : subject,
    date: new Date().toISOString(),
    sent: results.sent,
    failed: results.failed,
    totalLeads: leads.length,
    testMode: !!testMode,
  })
  await writeJson('sends.json', sends.slice(0, 50)) // keep last 50

  return NextResponse.json({
    success: true,
    totalLeads: leads.length,
    ...results,
  })
}
