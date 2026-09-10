'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check, Wand2 } from 'lucide-react'

interface BioOutput {
  linkedin: string
  twitter: string
  instagram: string
}

function generateBios(name: string, role: string, company: string, specialty: string, cta: string): BioOutput {
  const linkedin = `${role} at ${company} | Helping ${specialty} | ${cta} ↓

I work with founders and teams to build systems that scale — without the chaos.

📍 Open to: partnerships, consulting, collaborations
🔗 ${cta}`.slice(0, 300)

  const twitter = `${role} @${company.replace(/\s+/g, '')} | ${specialty} | ${cta}`.slice(0, 160)

  const instagram = `${role} @ ${company}\n✦ ${specialty}\n→ ${cta}`.slice(0, 150)

  return { linkedin, twitter, instagram }
}

function charColor(count: number, max: number) {
  const pct = count / max
  if (pct > 0.95) return 'text-red-500'
  if (pct > 0.85) return 'text-orange-500'
  return 'text-brand-muted dark:text-white/40'
}

export default function SocialMediaBioGenerator() {
  const [form, setForm] = useState({
    name: '',
    role: '',
    company: '',
    specialty: '',
    cta: '',
  })
  const [output, setOutput] = useState<BioOutput | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [generated, setGenerated] = useState(false)

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }))
  const canGenerate = form.role.trim() && form.company.trim() && form.specialty.trim() && form.cta.trim()

  const generate = () => {
    if (!canGenerate) return
    setOutput(generateBios(form.name, form.role, form.company, form.specialty, form.cta))
    setGenerated(true)
  }

  const copy = (platform: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(platform)
    setTimeout(() => setCopied(null), 2000)
  }

  const platforms = [
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: '💼',
      maxChars: 300,
      note: '300 chars — keyword-rich, professional',
    },
    {
      id: 'twitter',
      name: 'Twitter / X',
      icon: '🐦',
      maxChars: 160,
      note: '160 chars — punchy, personality-forward',
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: '📸',
      maxChars: 150,
      note: '150 chars — line-broken, visual-friendly',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="bg-brand-off-white dark:bg-[#111110] rounded-2xl p-6 border border-brand-border dark:border-white/8">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-body text-sm font-semibold text-brand-text dark:text-white block mb-2">
                Your name <span className="font-normal text-brand-muted dark:text-white/40">(optional)</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={e => update('name', e.target.value)}
                placeholder="e.g. Priya Sharma"
                className="w-full border border-brand-border dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted dark:placeholder:text-white/30"
              />
            </div>
            <div>
              <label className="font-body text-sm font-semibold text-brand-text dark:text-white block mb-2">Role / Title</label>
              <input
                type="text"
                value={form.role}
                onChange={e => update('role', e.target.value)}
                placeholder="e.g. Founder, Head of Marketing, Growth Lead"
                className="w-full border border-brand-border dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted dark:placeholder:text-white/30"
              />
            </div>
            <div>
              <label className="font-body text-sm font-semibold text-brand-text dark:text-white block mb-2">Company / Brand</label>
              <input
                type="text"
                value={form.company}
                onChange={e => update('company', e.target.value)}
                placeholder="e.g. Nebulaa.ai"
                className="w-full border border-brand-border dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted dark:placeholder:text-white/30"
              />
            </div>
            <div>
              <label className="font-body text-sm font-semibold text-brand-text dark:text-white block mb-2">What you help people do</label>
              <input
                type="text"
                value={form.specialty}
                onChange={e => update('specialty', e.target.value)}
                placeholder="e.g. founders automate their marketing"
                className="w-full border border-brand-border dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted dark:placeholder:text-white/30"
              />
            </div>
          </div>
          <div>
            <label className="font-body text-sm font-semibold text-brand-text dark:text-white block mb-2">Your CTA (what should they do?)</label>
            <input
              type="text"
              value={form.cta}
              onChange={e => update('cta', e.target.value)}
              placeholder="e.g. DM me to book a free call, Link in bio to start free trial"
              className="w-full border border-brand-border dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted dark:placeholder:text-white/30"
            />
          </div>
          <button
            onClick={generate}
            disabled={!canGenerate}
            className="flex items-center gap-2 bg-brand-gold text-brand-black font-body font-semibold rounded-full px-6 py-3 hover:bg-brand-gold-dim transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02]"
          >
            <Wand2 size={16} />
            Generate 3 Bios
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
            className="space-y-4"
          >
            {platforms.map(p => {
              const text = output[p.id as keyof BioOutput]
              const charCount = text.length
              return (
                <div
                  key={p.id}
                  className="bg-white dark:bg-[#1A1815] rounded-2xl border border-brand-border dark:border-white/8 overflow-hidden"
                >
                  <div className="flex items-center justify-between px-5 py-3 border-b border-brand-border dark:border-white/8">
                    <div className="flex items-center gap-2">
                      <span>{p.icon}</span>
                      <span className="font-body text-sm font-semibold text-brand-text dark:text-white">{p.name}</span>
                      <span className="font-body text-[10px] text-brand-muted dark:text-white/30">{p.note}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`font-body text-xs font-bold ${charColor(charCount, p.maxChars)}`}>
                        {charCount}/{p.maxChars}
                      </span>
                      <button
                        onClick={() => copy(p.id, text)}
                        className="flex items-center gap-1.5 font-body text-xs font-semibold text-brand-gold hover:text-brand-gold-dim transition-colors"
                      >
                        {copied === p.id ? <><Check size={12} />Copied!</> : <><Copy size={12} />Copy</>}
                      </button>
                    </div>
                  </div>
                  <div className="p-5">
                    <pre className="font-body text-sm text-brand-text dark:text-white whitespace-pre-wrap leading-relaxed">{text}</pre>
                  </div>
                </div>
              )
            })}

            <div className="px-1">
              <p className="font-body text-xs text-brand-muted dark:text-white/50">
                💡 Tip: Update your bios every quarter as your focus evolves. Consistent bios across platforms build trust faster.{' '}
                <a href="/pricing" className="text-brand-gold hover:underline">Automate your content with Gravity →</a>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
