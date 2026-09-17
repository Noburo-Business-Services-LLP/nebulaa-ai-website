'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check, Wand2 } from 'lucide-react'

const emailTemplates = [
  (data: Record<string, string>) => ({
    subject: `Quick question for ${data.targetName} at ${data.targetCompany}`,
    body: `Hi ${data.targetName},

I noticed ${data.targetCompany} is probably dealing with ${data.painPoint} — it's the #1 challenge we hear from companies like yours.

At ${data.yourCompany}, we help teams like yours ${data.valueProp} without the usual overhead.

We recently helped a similar company reduce their sales cycle by 40% in under 90 days — just by fixing how they handle this exact problem.

Would it make sense to have a 15-minute call this week to see if this is relevant for ${data.targetCompany}?

No pitch. Just a quick conversation.

${data.yourName}
${data.yourCompany}`,
  }),

  (data: Record<string, string>) => ({
    subject: `${data.targetCompany} + ${data.yourCompany} — worth a chat?`,
    body: `Hi ${data.targetName},

I'll keep this short — I know your inbox is already full.

You're likely spending more time than you should on ${data.painPoint}. It's a problem we've solved for companies exactly like ${data.targetCompany}.

${data.yourCompany} helps you ${data.valueProp}. Most of our customers see results in the first 30 days.

Here's what I'd love to do: jump on a 15-minute call and show you one specific thing that would make the biggest difference for your team. If it's not relevant, I'll never email you again.

Worth it?

${data.yourName}
${data.yourCompany}`,
  }),

  (data: Record<string, string>) => ({
    subject: `Saw ${data.targetCompany} on LinkedIn — had to reach out`,
    body: `Hi ${data.targetName},

I came across ${data.targetCompany} and was genuinely impressed by what you're building.

One thing I noticed: companies at your stage often struggle with ${data.painPoint}. It's not a strategy problem — it's a systems problem.

That's exactly what ${data.yourCompany} solves. We help companies like yours ${data.valueProp}, so your team can focus on what actually moves the needle.

I'd love to share a quick 2-minute example of how we've done this for others in your space.

Would a 15-minute call this Thursday or Friday work?

${data.yourName}
${data.yourCompany}`,
  }),
]

export default function ColdEmailGenerator() {
  const [form, setForm] = useState({
    yourName: '',
    yourCompany: '',
    targetName: '',
    targetCompany: '',
    painPoint: '',
    valueProp: '',
  })
  const [output, setOutput] = useState<{ subject: string; body: string } | null>(null)
  const [copiedSubject, setCopiedSubject] = useState(false)
  const [copiedBody, setCopiedBody] = useState(false)
  const [generated, setGenerated] = useState(false)

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }))

  const canGenerate = Object.values(form).every(v => v.trim().length > 0)

  const generate = () => {
    if (!canGenerate) return
    const template = emailTemplates[Math.floor(Math.random() * emailTemplates.length)]
    setOutput(template(form))
    setGenerated(true)
  }

  const copySubject = () => {
    if (!output) return
    navigator.clipboard.writeText(output.subject)
    setCopiedSubject(true)
    setTimeout(() => setCopiedSubject(false), 2000)
  }

  const copyAll = () => {
    if (!output) return
    navigator.clipboard.writeText(`Subject: ${output.subject}\n\n${output.body}`)
    setCopiedBody(true)
    setTimeout(() => setCopiedBody(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="bg-surface-2 rounded-2xl p-6 border border-rule">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-body text-sm font-semibold text-ink block mb-2">Your name</label>
              <input
                type="text"
                value={form.yourName}
                onChange={e => update('yourName', e.target.value)}
                placeholder="e.g. Navaneeth"
                className="w-full border border-rule bg-surface-2 text-ink rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-gold transition-colors placeholder:text-muted"
              />
            </div>
            <div>
              <label className="font-body text-sm font-semibold text-ink block mb-2">Your company</label>
              <input
                type="text"
                value={form.yourCompany}
                onChange={e => update('yourCompany', e.target.value)}
                placeholder="e.g. Nebulaa.ai"
                className="w-full border border-rule bg-surface-2 text-ink rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-gold transition-colors placeholder:text-muted"
              />
            </div>
            <div>
              <label className="font-body text-sm font-semibold text-ink block mb-2">Prospect name</label>
              <input
                type="text"
                value={form.targetName}
                onChange={e => update('targetName', e.target.value)}
                placeholder="e.g. Rahul"
                className="w-full border border-rule bg-surface-2 text-ink rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-gold transition-colors placeholder:text-muted"
              />
            </div>
            <div>
              <label className="font-body text-sm font-semibold text-ink block mb-2">Prospect company</label>
              <input
                type="text"
                value={form.targetCompany}
                onChange={e => update('targetCompany', e.target.value)}
                placeholder="e.g. TechCorp India"
                className="w-full border border-rule bg-surface-2 text-ink rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-gold transition-colors placeholder:text-muted"
              />
            </div>
          </div>
          <div>
            <label className="font-body text-sm font-semibold text-ink block mb-2">Main pain point</label>
            <input
              type="text"
              value={form.painPoint}
              onChange={e => update('painPoint', e.target.value)}
              placeholder="e.g. generating consistent B2B leads without a full sales team"
              className="w-full border border-rule bg-surface-2 text-ink rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-gold transition-colors placeholder:text-muted"
            />
          </div>
          <div>
            <label className="font-body text-sm font-semibold text-ink block mb-2">Your value proposition</label>
            <input
              type="text"
              value={form.valueProp}
              onChange={e => update('valueProp', e.target.value)}
              placeholder="e.g. automate their outreach and book 10+ demos per month on autopilot"
              className="w-full border border-rule bg-surface-2 text-ink rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-gold transition-colors placeholder:text-muted"
            />
          </div>
          <button
            onClick={generate}
            disabled={!canGenerate}
            className="flex items-center gap-2 bg-gold text-[#1A1208] font-body font-semibold rounded-full px-6 py-3 hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02]"
          >
            <Wand2 size={16} />
            Generate Cold Email
          </button>
        </div>
      </div>

      {/* Output */}
      <AnimatePresence>
        {generated && output && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-surface rounded-2xl border border-rule overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-rule">
              <span className="font-body text-sm font-semibold text-ink">Your Cold Email</span>
              <button
                onClick={copyAll}
                className="flex items-center gap-1.5 font-body text-xs font-semibold text-gold-text hover:text-gold-text-dim transition-colors"
              >
                {copiedBody ? <><Check size={12} />Copied!</> : <><Copy size={12} />Copy all</>}
              </button>
            </div>

            {/* Subject line */}
            <div className="px-5 py-4 border-b border-rule bg-gold/5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-body text-xs font-bold uppercase tracking-widest text-muted mb-1">Subject line</p>
                  <p className="font-body text-sm font-semibold text-ink">{output.subject}</p>
                </div>
                <button
                  onClick={copySubject}
                  className="flex-shrink-0 flex items-center gap-1 font-body text-xs text-muted hover:text-gold-text transition-colors"
                >
                  {copiedSubject ? <Check size={11} /> : <Copy size={11} />}
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-5">
              <pre className="font-body text-sm text-ink whitespace-pre-wrap leading-relaxed">{output.body}</pre>
            </div>

            <div className="px-5 py-3 bg-gold/5 border-t border-rule">
              <p className="font-body text-xs text-muted">
                💡 Tip: Personalize the first line with something specific about their company. Response rates jump 3x with genuine personalization.{' '}
                <a href="/pricing" className="text-gold-text hover:underline">Automate your outreach with Pulsar →</a>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
