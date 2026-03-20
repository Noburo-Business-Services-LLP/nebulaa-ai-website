'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check, Hash } from 'lucide-react'

type Platform = 'instagram' | 'linkedin' | 'twitter'

const hashtagPool: Record<string, Record<string, string[]>> = {
  instagram: {
    business: ['#entrepreneurship', '#business', '#startup', '#founder', '#entrepreneur', '#businessowner', '#smallbusiness', '#businessgrowth', '#businesstips', '#ceo', '#businesswoman', '#businessmindset', '#buildingabusiness', '#businesscoach'],
    marketing: ['#marketing', '#digitalmarketing', '#contentmarketing', '#socialmedia', '#growthhacking', '#marketingstrategy', '#instagrammarketing', '#onlinemarketing', '#emailmarketing', '#brandmarketing', '#contentcreator', '#socialmediatips'],
    startup: ['#startuplife', '#startupindia', '#saas', '#b2b', '#techstartup', '#bootstrapped', '#founderlife', '#venturecapital', '#startupgrowth', '#indiestartup', '#buildinginsocial', '#saasgrowth'],
    lifestyle: ['#productivity', '#motivation', '#success', '#hustle', '#mindset', '#personaldevelopment', '#selfimprovement', '#dailymotivation', '#goalsetting', '#worklifebalance', '#grindculture', '#successmindset'],
    india: ['#india', '#indianstartup', '#madeinindia', '#indiabusiness', '#mumbai', '#bangalore', '#delhi', '#hyderabad', '#chennai', '#indianentrepreneur', '#indiafounders', '#bharatbuilds'],
    tech: ['#technology', '#ai', '#artificialintelligence', '#innovation', '#automation', '#digitaltransformation', '#softwaredev', '#machinelearning', '#nocode', '#futureofwork', '#techfounder', '#aitools'],
    content: ['#contentcreation', '#reels', '#instagram', '#linkinbio', '#instagramgrowth', '#creativeentrepreneur', '#videocontent', '#ugc', '#trendingcontent', '#viralcontent', '#instagramstrategy', '#contentplanning'],
    community: ['#community', '#collaboration', '#networking', '#womeninbusiness', '#womenentrepreneurs', '#femalebusiness', '#supportsmallbusiness', '#businessnetwork', '#founderscommunity', '#entrepreneurcommunity'],
  },
  linkedin: {
    business: ['#entrepreneurship', '#business', '#leadership', '#founder', '#CEO', '#entrepreneurmindset', '#smallbusiness', '#businessgrowth', '#businessstrategy', '#corporatelife', '#management', '#businessdevelopment'],
    marketing: ['#marketing', '#digitalmarketing', '#contentmarketing', '#B2Bmarketing', '#growthhacking', '#demandgeneration', '#brandstrategy', '#marketingleadership', '#GTM', '#revenuemarketing', '#productmarketing', '#inboundmarketing'],
    startup: ['#startupfounder', '#venturecapital', '#startupecosystem', '#SaaS', '#B2B', '#techstartup', '#bootstrapped', '#productledgrowth', '#startuplesson', '#founderlife', '#startupadvice', '#earlystage'],
    career: ['#careerdevelopment', '#professionalgrowth', '#jobsearch', '#hiring', '#talentacquisition', '#workculture', '#remotework', '#futureofwork', '#leadership', '#teambuilding', '#mentorship', '#executivecoach'],
    india: ['#IndiaStartup', '#IndianFounder', '#MakeInIndia', '#StartupIndia', '#IndianEntrepreneur', '#IndiaBusinesses', '#IndianSaaS', '#BharatBuilds', '#TechIndia', '#FoundersOfIndia'],
    tech: ['#AI', '#ArtificialIntelligence', '#MachineLearning', '#DataScience', '#CloudComputing', '#Automation', '#DigitalTransformation', '#Innovation', '#TechLeadership', '#ProductManagement', '#EngineeringLeadership'],
  },
  twitter: {
    business: ['#entrepreneurship', '#business', '#founder', '#startup', '#CEO', '#businesstips', '#smallbiz', '#buildinginsocial', '#entrepreneur', '#bootstrapped', '#founderlife', '#buildinpublic'],
    marketing: ['#marketing', '#digitalmarketing', '#contentmarketing', '#SEO', '#growthhacking', '#emailmarketing', '#socialmedia', '#GTM', '#B2Bmarketing', '#contentcreator', '#copywriting', '#marketingtips'],
    startup: ['#SaaS', '#B2B', '#startup', '#indiehacker', '#buildinpublic', '#productledgrowth', '#startuplife', '#bootstrapped', '#vc', '#angelinvesting', '#earlyaccess', '#betalaunch'],
    tech: ['#AI', '#ML', '#automation', '#nocode', '#webdev', '#programming', '#OpenAI', '#ChatGPT', '#devtools', '#javascript', '#python', '#cloudnative'],
    india: ['#IndiaStartup', '#IndianFounder', '#MakeInIndia', '#BharatBuilds', '#IndianTech', '#StartupIndia', '#FoundersOfIndia', '#IndianSaaS'],
  },
}

function generateHashtags(topic: string, platform: Platform): { top: string[], medium: string[], niche: string[] } {
  const pool = hashtagPool[platform]
  const lowerTopic = topic.toLowerCase()
  const topicSlug = topic.replace(/\s+/g, '').toLowerCase()

  let primaryCategory = 'business'
  if (lowerTopic.match(/marketing|content|brand|social media|seo|email/)) primaryCategory = 'marketing'
  else if (lowerTopic.match(/tech|ai|software|app|code|dev|automation|machine learning/)) primaryCategory = 'tech'
  else if (lowerTopic.match(/startup|saas|b2b|venture|product|launch/)) primaryCategory = 'startup'
  else if (lowerTopic.match(/india|indian|desi|bharat/)) primaryCategory = 'india'
  else if (lowerTopic.match(/lifestyle|wellness|fitness|health|food|travel/)) primaryCategory = 'lifestyle'
  else if (lowerTopic.match(/content|creator|video|reel|post/)) primaryCategory = 'content'

  const primary = pool[primaryCategory] || pool.business
  const secondary = pool.marketing || pool.business
  const tertiary = pool.startup || pool.business

  const topicTags = [
    `#${topicSlug}`,
    `#${topicSlug}tips`,
    `#${topicSlug}community`,
    `#best${topicSlug}`,
    `#${topicSlug}growth`,
  ]

  const used = new Set<string>()
  const pick = (arr: string[], n: number): string[] => {
    const result: string[] = []
    for (const tag of arr) {
      if (result.length >= n) break
      if (!used.has(tag)) { used.add(tag); result.push(tag) }
    }
    return result
  }

  const top = pick(primary, 10)
  const medium = pick([...secondary, ...tertiary], 10)
  const niche = pick([...topicTags, ...(pool.india || [])], 10)

  return { top, medium, niche }
}

export default function HashtagGenerator() {
  const [topic, setTopic] = useState('')
  const [platform, setPlatform] = useState<Platform>('instagram')
  const [result, setResult] = useState<{ top: string[], medium: string[], niche: string[] } | null>(null)
  const [copied, setCopied] = useState<'top' | 'medium' | 'niche' | 'all' | null>(null)
  const [generated, setGenerated] = useState(false)

  const generate = () => {
    if (!topic.trim()) return
    setResult(generateHashtags(topic.trim(), platform))
    setGenerated(true)
  }

  const copyGroup = (group: 'top' | 'medium' | 'niche' | 'all') => {
    if (!result) return
    let text = ''
    if (group === 'all') text = [...result.top, ...result.medium, ...result.niche].join(' ')
    else text = result[group].join(' ')
    navigator.clipboard.writeText(text)
    setCopied(group)
    setTimeout(() => setCopied(null), 2000)
  }

  const charCount = result ? [...result.top, ...result.medium, ...result.niche].join(' ').length : 0

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="bg-brand-off-white dark:bg-[#111110] rounded-2xl p-6 border border-brand-border dark:border-white/8">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-1">
              <label className="font-body text-sm font-semibold text-brand-text dark:text-white block mb-2">
                Your topic or niche
              </label>
              <input
                type="text"
                value={topic}
                onChange={e => setTopic(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && generate()}
                placeholder="e.g. B2B SaaS marketing, fitness coaching, sustainable fashion"
                className="w-full border border-brand-border dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted dark:placeholder:text-white/30"
              />
            </div>
            <div>
              <label className="font-body text-sm font-semibold text-brand-text dark:text-white block mb-2">Platform</label>
              <select
                value={platform}
                onChange={e => setPlatform(e.target.value as Platform)}
                className="w-full border border-brand-border dark:border-white/10 dark:bg-[#1A1815] dark:text-white rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-brand-gold transition-colors"
              >
                <option value="instagram">Instagram</option>
                <option value="linkedin">LinkedIn</option>
                <option value="twitter">Twitter / X</option>
              </select>
            </div>
          </div>
          <button
            onClick={generate}
            disabled={!topic.trim()}
            className="flex items-center gap-2 bg-brand-gold text-brand-black font-body font-semibold rounded-full px-6 py-3 hover:bg-brand-gold-dim transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02]"
          >
            <Hash size={16} />
            Generate 30 Hashtags
          </button>
        </div>
      </div>

      {/* Output */}
      <AnimatePresence>
        {generated && result && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-[#1A1815] rounded-2xl border border-brand-border dark:border-white/8 overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-brand-border dark:border-white/8">
              <div className="flex items-center gap-3">
                <span className="font-body text-sm font-semibold text-brand-text dark:text-white">30 Hashtags for {platform}</span>
                <span className="font-body text-xs text-brand-muted dark:text-white/40">{charCount} chars</span>
              </div>
              <button
                onClick={() => copyGroup('all')}
                className="flex items-center gap-1.5 font-body text-xs font-semibold text-brand-gold hover:text-brand-gold-dim transition-colors"
              >
                {copied === 'all' ? <><Check size={12} />Copied!</> : <><Copy size={12} />Copy all 30</>}
              </button>
            </div>

            <div className="p-5 space-y-6">
              {/* Top */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-body text-xs font-bold uppercase tracking-widest text-brand-muted dark:text-white/40">
                      High Reach
                    </p>
                    <p className="font-body text-[10px] text-brand-muted dark:text-white/30">1M+ posts — broad discovery</p>
                  </div>
                  <button
                    onClick={() => copyGroup('top')}
                    className="flex items-center gap-1 font-body text-xs text-brand-muted dark:text-white/40 hover:text-brand-gold transition-colors"
                  >
                    {copied === 'top' ? <Check size={10} /> : <Copy size={10} />}
                    <span className="ml-0.5">Copy</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.top.map(h => (
                    <span key={h} className="font-body text-xs bg-brand-gold/10 dark:bg-brand-gold/15 text-brand-gold px-2.5 py-1 rounded-lg border border-brand-gold/20">
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Medium */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-body text-xs font-bold uppercase tracking-widest text-brand-muted dark:text-white/40">
                      Medium Reach
                    </p>
                    <p className="font-body text-[10px] text-brand-muted dark:text-white/30">100K–1M posts — better visibility</p>
                  </div>
                  <button
                    onClick={() => copyGroup('medium')}
                    className="flex items-center gap-1 font-body text-xs text-brand-muted dark:text-white/40 hover:text-brand-gold transition-colors"
                  >
                    {copied === 'medium' ? <Check size={10} /> : <Copy size={10} />}
                    <span className="ml-0.5">Copy</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.medium.map(h => (
                    <span key={h} className="font-body text-xs bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded-lg border border-blue-500/20">
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Niche */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-body text-xs font-bold uppercase tracking-widest text-brand-muted dark:text-white/40">
                      Niche
                    </p>
                    <p className="font-body text-[10px] text-brand-muted dark:text-white/30">Under 100K — targeted, less competition</p>
                  </div>
                  <button
                    onClick={() => copyGroup('niche')}
                    className="flex items-center gap-1 font-body text-xs text-brand-muted dark:text-white/40 hover:text-brand-gold transition-colors"
                  >
                    {copied === 'niche' ? <Check size={10} /> : <Copy size={10} />}
                    <span className="ml-0.5">Copy</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.niche.map(h => (
                    <span key={h} className="font-body text-xs bg-green-500/10 text-green-600 dark:text-green-400 px-2.5 py-1 rounded-lg border border-green-500/20">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-5 py-3 bg-brand-gold/5 dark:bg-brand-gold/10 border-t border-brand-border dark:border-white/5">
              <p className="font-body text-xs text-brand-muted dark:text-white/50">
                💡 Best strategy: Use 3–5 high reach + 3–5 medium + 2–3 niche per post. Rotate sets weekly to avoid shadowban.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
