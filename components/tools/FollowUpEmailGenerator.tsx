'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check, Wand2, ChevronDown } from 'lucide-react'

type Touchpoint = 'cold_email' | 'demo_call' | 'event' | 'inbound'

interface EmailEntry {
  day: string
  label: string
  emoji: string
  subject: string
  body: string
}

function buildSequence(data: {
  yourName: string
  yourCompany: string
  prospectName: string
  prospectCompany: string
  product: string
  touchpoint: Touchpoint
}): EmailEntry[] {
  const { yourName, yourCompany, prospectName, prospectCompany, product } = data

  return [
    {
      day: 'Day 1',
      label: 'The Gentle Nudge',
      emoji: '👋',
      subject: `Circling back — ${product} for ${prospectCompany}`,
      body: `Hi ${prospectName},

Just circling back on my earlier message about ${product}.

I know your inbox is busy, so I'll keep this short: ${yourCompany} helps companies like ${prospectCompany} ${product.toLowerCase()} without the usual overhead.

If timing is off, just say the word and I'll follow up in a month. If you're open to a 15-minute chat, I'd love to show you what we've built.

${yourName}
${yourCompany}`,
    },
    {
      day: 'Day 3',
      label: 'Add Value',
      emoji: '💡',
      subject: `This might be useful for ${prospectCompany}`,
      body: `Hi ${prospectName},

I thought of you when I read this — we worked with a company similar to ${prospectCompany} recently, and the one thing that made the biggest difference was [fixing their outreach process, not their product].

It's the same problem ${product} solves. I'd be happy to share the full breakdown if that's useful.

No strings. Just thought it might be relevant.

${yourName}
${yourCompany}`,
    },
    {
      day: 'Day 7',
      label: 'Social Proof',
      emoji: '🏆',
      subject: `How [Company X] solved the same problem ${prospectCompany} has`,
      body: `Hi ${prospectName},

Quick story — a company in your exact space came to us 3 months ago with the same challenge you're probably facing.

They were spending 15+ hours a week on manual outreach with inconsistent results. After using ${product}, they cut that to under 2 hours and doubled their response rate.

I think ${prospectCompany} could see similar results, given [what I know about your business].

Worth 15 minutes to find out? I have slots Thursday and Friday this week.

${yourName}
${yourCompany}`,
    },
    {
      day: 'Day 14',
      label: 'The Breakup',
      emoji: '📁',
      subject: `Should I close your file, ${prospectName}?`,
      body: `Hi ${prospectName},

I've reached out a few times about ${product} for ${prospectCompany} and haven't heard back — which usually means one of two things:

1. Bad timing — you're swamped and this isn't a priority right now
2. Not relevant — ${product} isn't a fit for where ${prospectCompany} is today

Either way, totally fine. I'll close your file unless I hear otherwise.

If things change, I'm always here.

${yourName}
${yourCompany}`,
    },
    {
      day: 'Day 21',
      label: 'Re-engagement',
      emoji: '🌱',
      subject: `Checking in — ${prospectCompany} + ${yourCompany}`,
      body: `Hi ${prospectName},

It's been a few weeks. I hope things at ${prospectCompany} are going well.

I'm not here to pitch — just wanted to share that we launched [a new feature / case study / resource] that directly addresses the ${product.toLowerCase()} challenge.

If you've been thinking about this problem again, now might be a good time to reconnect.

No pressure either way.

${yourName}
${yourCompany}`,
    },
  ]
}

export default function FollowUpEmailGenerator() {
  const [form, setForm] = useState({
    yourName: '',
    yourCompany: '',
    prospectName: '',
    prospectCompany: '',
    product: '',
    touchpoint: 'cold_email' as Touchpoint,
  })
  const [emails, setEmails] = useState<EmailEntry[]>([])
  const [generated, setGenerated] = useState(false)
  const [expanded, setExpanded] = useState<number | null>(0)
  const [copied, setCopied] = useState<string | null>(null)

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }))
  const canGenerate = form.yourName.trim() && form.yourCompany.trim() && form.prospectName.trim() && form.prospectCompany.trim() && form.product.trim()

  const generate = () => {
    if (!canGenerate) return
    setEmails(buildSequence(form))
    setGenerated(true)
    setExpanded(0)
  }

  const copy = (id: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="bg-brand-off-white dark:bg-[#111110] rounded-2xl p-6 border border-brand-border dark:border-white/8">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-body text-sm font-semibold text-brand-text dark:text-white block mb-2">Your name</label>
              <input
                type="text"
                value={form.yourName}
                onChange={e => update('yourName', e.target.value)}
                placeholder="e.g. Navaneeth"
                className="w-full border border-brand-border dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted dark:placeholder:text-white/30"
              />
            </div>
            <div>
              <label className="font-body text-sm font-semibold text-brand-text dark:text-white block mb-2">Your company</label>
              <input
                type="text"
                value={form.yourCompany}
                onChange={e => update('yourCompany', e.target.value)}
                placeholder="e.g. Nebulaa.ai"
                className="w-full border border-brand-border dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted dark:placeholder:text-white/30"
              />
            </div>
            <div>
              <label className="font-body text-sm font-semibold text-brand-text dark:text-white block mb-2">Prospect name</label>
              <input
                type="text"
                value={form.prospectName}
                onChange={e => update('prospectName', e.target.value)}
                placeholder="e.g. Rahul"
                className="w-full border border-brand-border dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted dark:placeholder:text-white/30"
              />
            </div>
            <div>
              <label className="font-body text-sm font-semibold text-brand-text dark:text-white block mb-2">Prospect company</label>
              <input
                type="text"
                value={form.prospectCompany}
                onChange={e => update('prospectCompany', e.target.value)}
                placeholder="e.g. TechCorp India"
                className="w-full border border-brand-border dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted dark:placeholder:text-white/30"
              />
            </div>
          </div>
          <div>
            <label className="font-body text-sm font-semibold text-brand-text dark:text-white block mb-2">Your product / service</label>
            <input
              type="text"
              value={form.product}
              onChange={e => update('product', e.target.value)}
              placeholder="e.g. AI-powered outreach automation for B2B founders"
              className="w-full border border-brand-border dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted dark:placeholder:text-white/30"
            />
          </div>
          <div>
            <label className="font-body text-sm font-semibold text-brand-text dark:text-white block mb-2">Original touchpoint</label>
            <select
              value={form.touchpoint}
              onChange={e => update('touchpoint', e.target.value)}
              className="w-full border border-brand-border dark:border-white/10 dark:bg-[#1A1815] dark:text-white rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-brand-gold transition-colors"
            >
              <option value="cold_email">Cold email</option>
              <option value="demo_call">Demo call</option>
              <option value="event">Event / Conference</option>
              <option value="inbound">Inbound enquiry</option>
            </select>
          </div>
          <button
            onClick={generate}
            disabled={!canGenerate}
            className="flex items-center gap-2 bg-brand-gold text-brand-black font-body font-semibold rounded-full px-6 py-3 hover:bg-brand-gold-dim transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02]"
          >
            <Wand2 size={16} />
            Generate 5-Email Sequence
          </button>
        </div>
      </div>

      {/* Output */}
      <AnimatePresence>
        {generated && emails.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-3"
          >
            {/* Timeline indicator */}
            <div className="flex items-center gap-0 overflow-x-auto pb-2">
              {emails.map((email, i) => (
                <div key={i} className="flex items-center">
                  <button
                    onClick={() => setExpanded(expanded === i ? null : i)}
                    className={`flex-shrink-0 flex flex-col items-center px-3 py-2 rounded-xl transition-all ${
                      expanded === i ? 'bg-brand-gold text-brand-black' : 'bg-brand-off-white dark:bg-white/5 text-brand-muted dark:text-white/50 hover:bg-brand-warm-gray dark:hover:bg-white/10'
                    }`}
                  >
                    <span className="text-base">{email.emoji}</span>
                    <span className="font-body text-[10px] font-bold mt-0.5">{email.day}</span>
                  </button>
                  {i < emails.length - 1 && (
                    <div className="w-4 h-px bg-brand-border dark:bg-white/10 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>

            {/* Email cards */}
            {emails.map((email, i) => (
              <div
                key={i}
                className="bg-white dark:bg-[#1A1815] rounded-2xl border border-brand-border dark:border-white/8 overflow-hidden"
              >
                <button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-brand-off-white dark:hover:bg-white/3 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{email.emoji}</span>
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <span className="font-body text-xs font-bold text-brand-gold uppercase tracking-widest">{email.day}</span>
                        <span className="font-body text-xs text-brand-muted dark:text-white/30">—</span>
                        <span className="font-body text-xs text-brand-muted dark:text-white/50">{email.label}</span>
                      </div>
                      <p className="font-body text-sm font-semibold text-brand-text dark:text-white mt-0.5 text-left">
                        {email.subject}
                      </p>
                    </div>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`flex-shrink-0 text-brand-muted dark:text-white/30 transition-transform ${expanded === i ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {expanded === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      {/* Subject */}
                      <div className="px-5 py-3 border-t border-brand-border dark:border-white/8 bg-brand-gold/5 dark:bg-brand-gold/5">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="font-body text-[10px] font-bold uppercase tracking-widest text-brand-muted dark:text-white/40 mb-1">Subject</p>
                            <p className="font-body text-sm text-brand-text dark:text-white">{email.subject}</p>
                          </div>
                          <button
                            onClick={() => copy(`subject-${i}`, email.subject)}
                            className="flex-shrink-0 text-brand-muted dark:text-white/30 hover:text-brand-gold transition-colors"
                          >
                            {copied === `subject-${i}` ? <Check size={13} /> : <Copy size={13} />}
                          </button>
                        </div>
                      </div>

                      {/* Body */}
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <p className="font-body text-[10px] font-bold uppercase tracking-widest text-brand-muted dark:text-white/40">Body</p>
                          <button
                            onClick={() => copy(`body-${i}`, `Subject: ${email.subject}\n\n${email.body}`)}
                            className="flex items-center gap-1.5 font-body text-xs font-semibold text-brand-gold hover:text-brand-gold-dim transition-colors"
                          >
                            {copied === `body-${i}` ? <><Check size={12} />Copied!</> : <><Copy size={12} />Copy email</>}
                          </button>
                        </div>
                        <pre className="font-body text-sm text-brand-text dark:text-white whitespace-pre-wrap leading-relaxed">
                          {email.body}
                        </pre>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            <div className="px-1">
              <p className="font-body text-xs text-brand-muted dark:text-white/50">
                💡 Pulsar by Nebulaa sends this entire sequence automatically — triggered by your CRM, timed perfectly.{' '}
                <a href="/#pricing" className="text-brand-gold hover:underline">Automate your follow-ups →</a>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
