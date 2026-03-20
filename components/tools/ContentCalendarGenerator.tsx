'use client'
import GenericTool from './GenericTool'

const templates = [
  (v: Record<string, string>) => {
    const biz = v.business
    const platform = v.platform
    return `30-DAY CONTENT CALENDAR FOR ${biz.toUpperCase()}
Platform: ${platform}

━━━━━━━━━━━━━━━━━━━━━━━

WEEK 1: ESTABLISH AUTHORITY
Theme: "What we know that others don't"

📅 Day 1 (Mon) — Educational
Post: "The 3 biggest mistakes ${biz} founders make"
Format: List post / carousel
Goal: Build credibility

📅 Day 3 (Wed) — Behind the scenes
Post: How we actually [do something your audience cares about]
Format: Story / short video
Goal: Build trust

📅 Day 5 (Fri) — Engagement
Post: "Hot take: [controversial opinion in your space]"
Format: Text post
Goal: Start conversations

━━━━━━━━━━━━━━━━━━━━━━━

WEEK 2: BUILD CONNECTION
Theme: "Real stories, real results"

📅 Day 8 (Mon) — Customer story
Post: How [type of customer] achieved [result] using [your method]
Format: Case study
Goal: Social proof

📅 Day 10 (Wed) — Personal story
Post: The mistake that taught me the most about ${biz}
Format: Storytelling post
Goal: Relatability

📅 Day 12 (Fri) — Practical value
Post: Free template / checklist / framework for [common problem]
Format: Resource post
Goal: Saves / shares

━━━━━━━━━━━━━━━━━━━━━━━

WEEK 3: DRIVE AWARENESS
Theme: "Why this matters now"

📅 Day 15 (Mon) — Trend post
Post: What's changing in [industry] and what it means for you
Format: Analysis post
Goal: Thought leadership

📅 Day 17 (Wed) — Comparison
Post: [Your approach] vs [old/common approach] — here's the data
Format: Before/after
Goal: Differentiation

📅 Day 19 (Fri) — Community
Post: Poll / question for your audience
Format: Engagement post
Goal: Audience insight

━━━━━━━━━━━━━━━━━━━━━━━

WEEK 4: CONVERT FOLLOWERS TO CUSTOMERS
Theme: "Here's how we can help"

📅 Day 22 (Mon) — Product/offer (soft)
Post: "We built [product] because [problem we kept seeing]"
Format: Origin story
Goal: Brand awareness

📅 Day 24 (Wed) — Testimonial
Post: "[Customer name] went from [before] to [after] in [timeframe]"
Format: Social proof
Goal: Trust + conversion

📅 Day 26 (Fri) — Direct CTA
Post: "If you're a [ICP], here's how to work with us"
Format: Clear offer post
Goal: Pipeline

━━━━━━━━━━━━━━━━━━━━━━━

CONTENT RULES FOR ${platform.toUpperCase()}:
→ Post at consistent times (best: 8-9am and 12-1pm)
→ Engage with comments within the first 60 minutes
→ Never post and ghost — respond to every comment
→ Repurpose top posts after 30 days
→ Track: views, saves, follows, DMs`
  },
]

export default function ContentCalendarGenerator() {
  return (
    <GenericTool
      fields={[
        { key: 'business', label: 'Your business / industry', type: 'text', placeholder: "e.g. 'SaaS startup' or 'B2B consulting firm'" },
        { key: 'platform', label: 'Primary platform', type: 'select', options: ['LinkedIn', 'Instagram', 'Twitter/X', 'LinkedIn + Instagram'] },
      ]}
      templates={templates}
      outputLabel="Your 30-Day Content Calendar"
      buttonLabel="Generate Calendar"
      tip="Batch create content on one day each week. Consistency beats perfection every time."
    />
  )
}
