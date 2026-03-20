'use client'
import GenericTool from './GenericTool'

const templates = [
  (v: Record<string, string>) => `${v.title}

${v.description ? v.description + '\n\n' : ''}In this video, I break down everything you need to know about ${v.topic}.

Whether you're just starting out or looking to level up, this is for you.

━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 WHAT'S COVERED IN THIS VIDEO
━━━━━━━━━━━━━━━━━━━━━━━━━━

00:00 - Introduction
02:30 - The core problem most people miss
05:00 - The exact strategy that works
10:00 - Step-by-step walkthrough
15:00 - Real results and case study
18:00 - Common mistakes to avoid
20:00 - Action steps for you

━━━━━━━━━━━━━━━━━━━━━━━━━━
🔗 LINKS MENTIONED
━━━━━━━━━━━━━━━━━━━━━━━━━━

[Link 1] - [Description]
[Link 2] - [Description]

━━━━━━━━━━━━━━━━━━━━━━━━━━
👋 ABOUT THIS CHANNEL
━━━━━━━━━━━━━━━━━━━━━━━━━━

I share weekly videos on ${v.topic} for founders and entrepreneurs who want real, actionable advice — not theory.

Subscribe and hit the bell 🔔 so you never miss a video.

━━━━━━━━━━━━━━━━━━━━━━━━━━

#${v.topic.replace(/\s+/g, '')} #Founder #Entrepreneur #Startup #GrowthHacking #BusinessTips #${v.topic.replace(/\s+/g, '').slice(0, 15)}Tips`,
]

export default function YoutubeDescriptionGenerator() {
  return (
    <GenericTool
      fields={[
        { key: 'title', label: 'Video title', type: 'text', placeholder: "e.g. 'How I Got My First 100 B2B Customers Without Paid Ads'" },
        { key: 'topic', label: 'Main topic / keyword', type: 'text', placeholder: "e.g. 'B2B cold outreach' or 'startup growth'" },
        { key: 'description', label: 'One-line description (optional)', type: 'text', placeholder: "e.g. 'In this video I share the exact outreach strategy that got us 100 customers in 90 days.'" },
      ]}
      templates={templates}
      outputLabel="Your YouTube Description"
      buttonLabel="Generate Description"
      tip="Put your main keyword in the first 2 lines for better SEO. Include a CTA above the fold."
    />
  )
}
