'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check, Wand2 } from 'lucide-react'

const captionTemplates = {
  casual: (desc: string, brand: string) => `okay can we just talk about ${desc} for a second? 🙌

this has honestly been such a vibe lately and I'm not even sorry about it ✨

dropping this here because you guys deserve to know 👀

${brand ? `— ${brand}` : ''}

save this for later, you'll thank me 📌`,

  inspirational: (desc: string, brand: string) => `${desc} — and it's everything. ✨

Sometimes the smallest shifts create the biggest changes. This is one of those moments.

Reminder: You're doing better than you think. Keep going. 💛

${brand ? `Brought to you with love by ${brand} 🤍` : ''}

Tag someone who needs to see this today 👇`,

  promotional: (desc: string, brand: string) => `Introducing: ${desc} 🚀

Here's everything you need to know:

✅ Built for people who want results
✅ No complicated setup
✅ Works from day one

${brand ? `This is what ${brand} is all about.` : ''}

Link in bio to grab yours. Don't sleep on this 👆`,

  educational: (desc: string, brand: string) => `Did you know? ${desc} 🧠

Most people overlook this — but once you know it, you can't unsee it.

Here's the quick breakdown:

→ Start with the basics
→ Build consistency over time
→ Measure what matters

${brand ? `${brand} breaks it down for you every week.` : ''}

Save this post for when you need a reminder 📌
Follow for more tips like this every week 👆`,
}

const hashtagDatabase: Record<string, string[]> = {
  business: ['#entrepreneurship', '#business', '#startup', '#founder', '#ceo', '#entrepreneur', '#businessowner', '#smallbusiness', '#businessgrowth', '#businesstips'],
  marketing: ['#marketing', '#digitalmarketing', '#contentmarketing', '#socialmedia', '#growthhacking', '#marketingstrategy', '#brandmarketing', '#onlinemarketing', '#emailmarketing', '#influencermarketing'],
  startup: ['#startuplife', '#startupindia', '#saas', '#b2b', '#growthhack', '#techstartup', '#bootstrapped', '#founderlife', '#venturecapital', '#startupgrowth'],
  lifestyle: ['#productivity', '#motivation', '#success', '#hustle', '#mindset', '#personaldevelopment', '#selfimprovement', '#dailymotivation', '#goalsetting', '#womenempowerment'],
  content: ['#contentcreator', '#contentstrategy', '#blogging', '#socialmediatips', '#instagrammarketing', '#reels', '#instagram', '#linkinbio', '#instagramgrowth', '#creativeentrepreneur'],
  community: ['#community', '#collaboration', '#networking', '#supportsmallbusiness', '#shoplocal', '#womeninbusiness', '#momboss', '#bossbabe', '#girlboss', '#femalebusiness'],
  india: ['#india', '#indianstartup', '#madeinIndia', '#indiabusiness', '#desi', '#mumbai', '#bangalore', '#delhi', '#hyderabad', '#chennai'],
  tech: ['#technology', '#ai', '#artificialintelligence', '#innovation', '#techfounder', '#automation', '#future', '#digitaltransformation', '#softwaredev', '#machinelearning'],
}

function buildHashtags(topic: string): { top: string[], medium: string[], niche: string[] } {
  const lowerTopic = topic.toLowerCase()

  let top: string[] = []
  let medium: string[] = []
  let niche: string[] = []

  // Pick based on topic relevance
  if (lowerTopic.match(/business|startup|founder|entrepreneur/)) {
    top = hashtagDatabase.business.slice(0, 4)
    medium = hashtagDatabase.startup.slice(0, 4)
    niche = hashtagDatabase.india.slice(0, 2)
  } else if (lowerTopic.match(/marketing|content|brand|social/)) {
    top = hashtagDatabase.marketing.slice(0, 4)
    medium = hashtagDatabase.content.slice(0, 4)
    niche = hashtagDatabase.startup.slice(0, 2)
  } else if (lowerTopic.match(/tech|ai|software|app|digital/)) {
    top = hashtagDatabase.tech.slice(0, 4)
    medium = hashtagDatabase.marketing.slice(0, 4)
    niche = hashtagDatabase.startup.slice(0, 2)
  } else if (lowerTopic.match(/lifestyle|motivation|mindset|success/)) {
    top = hashtagDatabase.lifestyle.slice(0, 4)
    medium = hashtagDatabase.community.slice(0, 4)
    niche = hashtagDatabase.content.slice(0, 2)
  } else {
    top = hashtagDatabase.business.slice(0, 4)
    medium = hashtagDatabase.lifestyle.slice(0, 4)
    niche = hashtagDatabase.india.slice(0, 2)
  }

  // Fill remaining with mix
  const remaining = [
    ...hashtagDatabase.content,
    ...hashtagDatabase.community,
    ...hashtagDatabase.lifestyle,
    ...hashtagDatabase.startup,
  ].filter(h => !top.includes(h) && !medium.includes(h) && !niche.includes(h))

  const slugTopic = `#${topic.replace(/\s+/g, '').toLowerCase()}`
  const topicHashtags = [
    slugTopic,
    `#${topic.replace(/\s+/g, '').toLowerCase()}tips`,
    `#${topic.replace(/\s+/g, '').toLowerCase()}life`,
  ]

  // Build 10/10/10
  top = [...top, ...remaining.slice(0, 6)].slice(0, 10)
  medium = [...medium, ...remaining.slice(6, 12)].slice(0, 10)
  niche = [...topicHashtags, ...niche, ...remaining.slice(12, 17)].slice(0, 10)

  return { top, medium, niche }
}

export default function InstagramCaptionGenerator() {
  const [desc, setDesc] = useState('')
  const [brand, setBrand] = useState('')
  const [tone, setTone] = useState('casual')
  const [output, setOutput] = useState('')
  const [hashtags, setHashtags] = useState<{ top: string[], medium: string[], niche: string[] } | null>(null)
  const [copied, setCopied] = useState(false)
  const [copiedHashtags, setCopiedHashtags] = useState(false)
  const [generated, setGenerated] = useState(false)

  const generate = () => {
    if (!desc.trim()) return
    const fn = captionTemplates[tone as keyof typeof captionTemplates]
    setOutput(fn(desc.trim(), brand.trim()))
    setHashtags(buildHashtags(desc.trim()))
    setGenerated(true)
  }

  const allHashtags = hashtags
    ? [...hashtags.top, ...hashtags.medium, ...hashtags.niche].join(' ')
    : ''

  const copyCaption = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const copyHashtags = () => {
    navigator.clipboard.writeText(allHashtags)
    setCopiedHashtags(true)
    setTimeout(() => setCopiedHashtags(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="bg-brand-off-white dark:bg-[#111110] rounded-2xl p-6 border border-brand-border dark:border-white/8">
        <div className="space-y-4">
          <div>
            <label className="font-body text-sm font-semibold text-brand-text dark:text-white block mb-2">
              Describe your post
            </label>
            <textarea
              value={desc}
              onChange={e => setDesc(e.target.value)}
              rows={3}
              placeholder="e.g. 'behind the scenes of building my SaaS in 60 days' or 'new product launch for eco water bottles'"
              className="w-full border border-brand-border dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl px-4 py-3 font-body text-sm resize-none outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted dark:placeholder:text-white/30"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-body text-sm font-semibold text-brand-text dark:text-white block mb-2">
                Brand / Account name <span className="font-normal text-brand-muted dark:text-white/40">(optional)</span>
              </label>
              <input
                type="text"
                value={brand}
                onChange={e => setBrand(e.target.value)}
                placeholder="e.g. Nebulaa.ai"
                className="w-full border border-brand-border dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted dark:placeholder:text-white/30"
              />
            </div>
            <div>
              <label className="font-body text-sm font-semibold text-brand-text dark:text-white block mb-2">Tone</label>
              <select
                value={tone}
                onChange={e => setTone(e.target.value)}
                className="w-full border border-brand-border dark:border-white/10 dark:bg-[#1A1815] dark:text-white rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-brand-gold transition-colors"
              >
                <option value="casual">Casual / Relatable</option>
                <option value="inspirational">Inspirational</option>
                <option value="promotional">Promotional</option>
                <option value="educational">Educational</option>
              </select>
            </div>
          </div>
          <button
            onClick={generate}
            disabled={!desc.trim()}
            className="flex items-center gap-2 bg-brand-gold text-brand-black font-body font-semibold rounded-full px-6 py-3 hover:bg-brand-gold-dim transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02]"
          >
            <Wand2 size={16} />
            Generate Caption
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
            className="space-y-5"
          >
            {/* Caption */}
            <div className="bg-white dark:bg-[#1A1815] rounded-2xl border border-brand-border dark:border-white/8 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-brand-border dark:border-white/8">
                <span className="font-body text-sm font-semibold text-brand-text dark:text-white">Caption</span>
                <button
                  onClick={copyCaption}
                  className="flex items-center gap-1.5 font-body text-xs font-semibold text-brand-gold hover:text-brand-gold-dim transition-colors"
                >
                  {copied ? <><Check size={12} />Copied!</> : <><Copy size={12} />Copy</>}
                </button>
              </div>
              <div className="p-5">
                <pre className="font-body text-sm text-brand-text dark:text-white whitespace-pre-wrap leading-relaxed">{output}</pre>
              </div>
            </div>

            {/* Hashtags */}
            {hashtags && (
              <div className="bg-white dark:bg-[#1A1815] rounded-2xl border border-brand-border dark:border-white/8 overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3 border-b border-brand-border dark:border-white/8">
                  <span className="font-body text-sm font-semibold text-brand-text dark:text-white">30 Hashtags</span>
                  <button
                    onClick={copyHashtags}
                    className="flex items-center gap-1.5 font-body text-xs font-semibold text-brand-gold hover:text-brand-gold-dim transition-colors"
                  >
                    {copiedHashtags ? <><Check size={12} />Copied!</> : <><Copy size={12} />Copy all</>}
                  </button>
                </div>
                <div className="p-5 space-y-4">
                  <div>
                    <p className="font-body text-xs font-bold text-brand-muted dark:text-white/40 uppercase tracking-widest mb-2">
                      High Reach (10)
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {hashtags.top.map(h => (
                        <span key={h} className="font-body text-xs bg-brand-gold/10 text-brand-gold px-2 py-1 rounded-lg">{h}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="font-body text-xs font-bold text-brand-muted dark:text-white/40 uppercase tracking-widest mb-2">
                      Medium Reach (10)
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {hashtags.medium.map(h => (
                        <span key={h} className="font-body text-xs bg-blue-500/10 text-blue-500 dark:text-blue-400 px-2 py-1 rounded-lg">{h}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="font-body text-xs font-bold text-brand-muted dark:text-white/40 uppercase tracking-widest mb-2">
                      Niche (10)
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {hashtags.niche.map(h => (
                        <span key={h} className="font-body text-xs bg-green-500/10 text-green-600 dark:text-green-400 px-2 py-1 rounded-lg">{h}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="px-1">
              <p className="font-body text-xs text-brand-muted dark:text-white/50">
                💡 Tip: Post the hashtags in the first comment, not the caption, for a cleaner look. Want automated captions daily?{' '}
                <a href="/pricing" className="text-brand-gold hover:underline">Try Gravity →</a>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
