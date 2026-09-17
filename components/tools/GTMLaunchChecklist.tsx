'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download } from 'lucide-react'

interface ChecklistItem {
  id: string
  text: string
}

interface ChecklistCategory {
  name: string
  emoji: string
  items: ChecklistItem[]
}

const checklist: ChecklistCategory[] = [
  {
    name: 'Positioning',
    emoji: '🎯',
    items: [
      { id: 'icp', text: 'Ideal Customer Profile (ICP) defined with demographics + psychographics' },
      { id: 'value_prop', text: 'Value proposition written and tested with 5+ potential customers' },
      { id: 'positioning', text: 'Positioning statement completed (For X, who Y, our product Z, unlike A, we B)' },
      { id: 'competitor', text: 'Competitor analysis done — top 3–5 alternatives mapped' },
      { id: 'differentiators', text: 'Unique differentiators identified and ranked by importance' },
      { id: 'pricing', text: 'Pricing decided — tiers, value metric, and competitors benchmarked' },
      { id: 'messaging', text: 'Messaging hierarchy created — headline, sub-headline, bullets' },
      { id: 'tagline', text: 'Tagline / hero headline finalized and tested on landing page' },
    ],
  },
  {
    name: 'Content',
    emoji: '✍️',
    items: [
      { id: 'website_copy', text: 'Website copy written for all pages (home, product, pricing, about)' },
      { id: 'landing_page', text: 'Primary landing page live with CTA and conversion tracking' },
      { id: 'blog_posts', text: 'Minimum 3 SEO blog posts published before launch' },
      { id: 'linkedin_page', text: 'LinkedIn company page set up, branded, and populated' },
      { id: 'social_profiles', text: 'All social media profiles created with consistent branding' },
      { id: 'demo_video', text: 'Product demo video recorded (2–5 minutes, screen + voiceover)' },
      { id: 'case_studies', text: 'At least 1 case study or testimonial from beta/pilot users' },
      { id: 'email_templates', text: 'Email templates written for welcome, onboarding, and follow-up' },
    ],
  },
  {
    name: 'Outreach',
    emoji: '📤',
    items: [
      { id: 'lead_list', text: 'Lead list built with 100+ qualified contacts (name, email, company)' },
      { id: 'cold_email', text: 'Cold email sequence written and A/B tested (subject lines + body)' },
      { id: 'linkedin_strategy', text: 'LinkedIn connection + DM strategy defined and templated' },
      { id: 'whatsapp_plan', text: 'WhatsApp outreach plan ready (groups, broadcast lists, message templates)' },
      { id: 'followup_sequence', text: '5-email follow-up sequence created with timing and triggers' },
      { id: 'crm_setup', text: 'CRM set up with pipeline stages, lead statuses, and automations' },
      { id: 'pixels', text: 'Tracking pixels installed (Meta, Google, LinkedIn) with events firing' },
      { id: 'analytics', text: 'Analytics configured (GA4 or equivalent) with goals and conversions set' },
    ],
  },
  {
    name: 'Launch',
    emoji: '🚀',
    items: [
      { id: 'launch_date', text: 'Launch date set and communicated to team and stakeholders' },
      { id: 'beta_users', text: 'Beta users / design partners invited and onboarded (min 10)' },
      { id: 'product_hunt', text: 'Product Hunt listing prepared with assets, tagline, and makers added' },
      { id: 'announcement', text: 'Launch announcement email drafted for your full contact list' },
      { id: 'social_posts', text: 'Launch social posts scheduled across all platforms' },
      { id: 'press_media', text: 'Press / media list compiled with 10+ relevant journalists or newsletters' },
      { id: 'referral', text: 'Referral or affiliate program created and ready to activate' },
      { id: 'support_docs', text: 'Support documentation / FAQ published (help center or notion)' },
    ],
  },
  {
    name: 'Metrics',
    emoji: '📊',
    items: [
      { id: 'north_star', text: 'North star metric defined (the one number that captures growth)' },
      { id: 'review_cadence', text: 'Weekly review cadence scheduled with team (same day, same time)' },
      { id: 'activation', text: 'Activation metric defined (what does a successful first session look like?)' },
      { id: 'revenue_goal', text: 'Revenue goal set for Month 1, Month 3, and Month 6' },
      { id: 'pipeline_target', text: 'Pipeline target set (leads needed per month to hit revenue goal)' },
      { id: 'churn_baseline', text: 'Churn baseline established and acceptable range defined' },
      { id: 'nps_baseline', text: 'NPS baseline survey sent to first 20 users' },
      { id: 'dashboard', text: 'Reporting dashboard live with real-time metrics visible to team' },
    ],
  },
]

const totalItems = checklist.reduce((sum, cat) => sum + cat.items.length, 0)

export default function GTMLaunchChecklist() {
  const [checked, setChecked] = useState<Set<string>>(new Set())

  const toggle = (id: string) => {
    setChecked(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const completedCount = checked.size
  const overallPct = Math.round((completedCount / totalItems) * 100)

  const getMilestoneMessage = () => {
    if (overallPct === 100) return { msg: "You're launch-ready. Ship it! 🚀", color: 'text-green-500' }
    if (overallPct >= 75) return { msg: "Almost there! Finish the last stretch.", color: 'text-gold-text' }
    if (overallPct >= 50) return { msg: "Halfway done. Great momentum.", color: 'text-blue-500' }
    if (overallPct >= 25) return { msg: "Good start. Keep going.", color: 'text-muted' }
    return { msg: "Start checking off items below.", color: 'text-muted' }
  }

  const milestone = getMilestoneMessage()

  const exportChecklist = () => {
    const lines = [
      'GTM Launch Checklist — Nebulaa.ai',
      `Completed: ${completedCount}/${totalItems} (${overallPct}%)`,
      '',
      ...checklist.flatMap(cat => [
        `\n${cat.emoji} ${cat.name.toUpperCase()}`,
        ...cat.items.map(item => `${checked.has(item.id) ? '[x]' : '[ ]'} ${item.text}`),
      ]),
      '',
      'Generated free at nebulaa.ai/tools',
    ]
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'gtm-launch-checklist.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Overall progress */}
      <div className="bg-surface-2 rounded-2xl p-5 border border-rule">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="font-body text-sm font-semibold text-ink">
              {completedCount} / {totalItems} completed
            </p>
            <p className={`font-body text-xs mt-0.5 ${milestone.color}`}>{milestone.msg}</p>
          </div>
          <div className="text-right">
            <p className="font-heading font-bold text-3xl text-gold-text">{overallPct}%</p>
          </div>
        </div>
        <div className="bg-surface-2 rounded-full h-2">
          <motion.div
            className="bg-gold h-2 rounded-full transition-all duration-500"
            style={{ width: `${overallPct}%` }}
          />
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={exportChecklist}
            className="flex items-center gap-1.5 font-body text-xs font-semibold text-muted hover:text-gold-text transition-colors"
          >
            <Download size={13} />
            Export as .txt
          </button>
        </div>
      </div>

      {/* Categories */}
      {checklist.map(cat => {
        const catCompleted = cat.items.filter(item => checked.has(item.id)).length
        const catPct = Math.round((catCompleted / cat.items.length) * 100)

        return (
          <div
            key={cat.name}
            className="bg-surface rounded-2xl border border-rule overflow-hidden"
          >
            {/* Category header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-rule bg-surface-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">{cat.emoji}</span>
                <span className="font-heading font-bold text-sm text-ink">{cat.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-body text-xs text-muted">{catCompleted}/{cat.items.length}</span>
                <div className="w-16 bg-surface-2 rounded-full h-1.5">
                  <div
                    className="bg-gold h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${catPct}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="divide-y divide-rule">
              {cat.items.map(item => (
                <label
                  key={item.id}
                  className="flex items-start gap-3 px-5 py-3.5 cursor-pointer hover:bg-surface-2 transition-colors group"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <div
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                        checked.has(item.id)
                          ? 'bg-gold border-gold'
                          : 'border-rule-2 group-hover:border-gold'
                      }`}
                    >
                      {checked.has(item.id) && (
                        <svg className="w-2.5 h-2.5 text-[#1A1208]" fill="currentColor" viewBox="0 0 12 12">
                          <path d="M10 3L5 8.5 2 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={checked.has(item.id)}
                    onChange={() => toggle(item.id)}
                    className="sr-only"
                  />
                  <span
                    className={`font-body text-sm leading-relaxed transition-colors ${
                      checked.has(item.id)
                        ? 'text-faint line-through'
                        : 'text-ink'
                    }`}
                  >
                    {item.text}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )
      })}

      <div className="px-1">
        <p className="font-body text-xs text-muted">
          💡 Want Gravity to handle the Content and Outreach sections automatically?{' '}
          <a href="/pricing" className="text-gold-text hover:underline">Try Nebulaa free →</a>
        </p>
      </div>
    </div>
  )
}
