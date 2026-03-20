export interface ContentIdea {
  id: string
  title: string
  emoji: string
  prompt: string
  tags: string[]
  type: 'blog' | 'newsletter' | 'both'
}

export const contentIdeas: ContentIdea[] = [
  // ── BLOG IDEAS ────────────────────────────────────────────────────────────
  {
    id: 'gtm-experiment',
    title: 'GTM Experiment: We Tested [X] for 30 Days',
    emoji: '🧪',
    prompt: `Write a real-feeling GTM experiment blog post. Structure:
- Punchy H1 title with specific numbers (e.g. "We Ran 200 Cold LinkedIn DMs in 30 Days — Here's What Actually Happened")
- TLDR box at the top (3 bullet takeaways for skimmers)
- Setup: what we tested, why, our hypothesis (be specific about the exact tactic)
- The raw data: include a realistic markdown table with week-by-week numbers (replies, conversions, etc.)
- What worked, what flopped, and why (be honest — include the failures)
- The 1 insight we didn't expect
- What we'd do differently + exact next test
- SEO: use phrases like "cold outreach results", "linkedin dms for b2b", "gtm experiment india"
- End with Nebulaa CTA
Tone: First-person founder voice, Gen Z energy, ₹ not $, Indian startup context, 700-900 words.`,
    tags: ['gtm', 'experiment', 'data', 'linkedin', 'cold-outreach'],
    type: 'blog',
  },
  {
    id: 'founder-mistake',
    title: 'The [Expensive] Mistake That Cost Us [₹X / X Months]',
    emoji: '💸',
    prompt: `Write a deeply honest founder mistake post. Structure:
- H1 with a specific, costly mistake (make it relatable but painfully specific)
- The setup: what we believed, why it made sense at the time
- How the mistake happened (tell the actual story — include the moment we realized)
- The real cost: time, money, opportunity cost (use realistic ₹ figures)
- Why 90% of founders make this same mistake (validate the reader)
- The 3-step fix we wish we'd known
- What we do now instead (specific system or process)
- SEO phrases: "founder mistakes india", "startup gtm mistakes", "b2b sales mistakes early stage"
- End with Nebulaa CTA
Tone: Raw and honest, first-person, Gen Z but professional. 700-900 words.`,
    tags: ['founder', 'mistakes', 'lessons', 'startup'],
    type: 'blog',
  },
  {
    id: 'competitor-comparison',
    title: 'Nebulaa vs [Competitor]: Honest 2025 Comparison',
    emoji: '⚔️',
    prompt: `Write a fair, SEO-optimised comparison post. Structure:
- H1: "Nebulaa vs [Competitor]: Which GTM Tool Is Right for You in 2025?"
- Quick answer box at top (2 sentences, direct verdict)
- Who each tool is for (be honest about ideal use cases for both)
- Feature comparison table (5-7 features, be fair about where competitor wins)
- Pricing comparison (use realistic numbers)
- 3 real scenarios: "Choose Nebulaa if..." and "Choose [Competitor] if..."
- The honest verdict
- SEO phrases: "[competitor] alternative", "nebulaa vs [competitor]", "gtm tool comparison india 2025"
- End with CTA to try Nebulaa free
Tone: Honest, not marketing-speak. Readers respect fairness. 800-1000 words.`,
    tags: ['comparison', 'seo', 'competitor', 'tools'],
    type: 'blog',
  },
  {
    id: 'contrarian-take',
    title: 'Hot Take: [Common Advice] Is Killing Your Pipeline',
    emoji: '🔥',
    prompt: `Write a spicy contrarian take that makes founders think. Structure:
- H1 that challenges a popular belief (e.g. "Stop Posting Daily on LinkedIn — Here's Why It's Hurting You")
- Open with the contrarian statement, no hedging
- The conventional wisdom (what everyone believes)
- 3 specific reasons why it's wrong (for Indian founders / early-stage specifically)
- The counterargument: when the conventional wisdom IS right
- What you should do instead (specific, actionable alternative)
- Real example or data point to back it up
- SEO phrases: "linkedin growth india", "b2b marketing mistakes", "cold email vs linkedin"
- End with Nebulaa CTA
Tone: Confident, provocative, first-person. Gen Z directness. 600-800 words.`,
    tags: ['hot-take', 'engagement', 'contrarian', 'linkedin'],
    type: 'blog',
  },
  {
    id: 'playbook',
    title: 'The [X]-Day Playbook: From 0 to [Milestone]',
    emoji: '📖',
    prompt: `Write a step-by-step playbook that founders can actually use. Structure:
- H1 with specific milestone (e.g. "The 90-Day Playbook: From 0 to Your First ₹10L in ARR")
- Who this is for (be specific about the stage and type of founder)
- Week-by-week breakdown (Weeks 1-4 or Days 1/7/14/30/60/90)
- For each week: the 3 non-negotiable actions, the metric to track, common mistakes to avoid
- The tools you need (mention Nebulaa naturally)
- What success looks like at each stage
- The honest disclaimer: what this won't work for
- SEO phrases: "b2b sales playbook india", "startup gtm playbook", "how to get first customers saas india"
- End with Nebulaa CTA
Tone: Practical, specific, zero fluff. Like advice from a founder friend. 900-1100 words.`,
    tags: ['playbook', 'how-to', 'actionable', 'strategy'],
    type: 'blog',
  },
  {
    id: 'behind-scenes',
    title: 'How We Built [X] at Nebulaa (And What We\'d Do Differently)',
    emoji: '🏗️',
    prompt: `Write a transparent behind-the-scenes post about building Nebulaa. Structure:
- H1 that's specific about what you're sharing (e.g. "How We Built Our First AI Sales Agent in 6 Weeks")
- The problem we were trying to solve (founder context)
- The first attempt: what we built, why it didn't work
- The pivot: what changed, what insight unlocked it
- The actual build process (be specific about tech choices, timeline, resources)
- 3 things that surprised us
- What we'd do differently if starting today
- How it's performing now (realistic metrics)
- SEO phrases: "building ai tools india", "saas product development", "startup product iteration"
- End with Nebulaa CTA
Tone: First-person, honest, transparent. Founders love this. 800-1000 words.`,
    tags: ['behind-scenes', 'building-in-public', 'product'],
    type: 'blog',
  },
  {
    id: 'trend-analysis',
    title: 'What\'s Actually Happening in [GTM/AI/Sales] Right Now (2025)',
    emoji: '📊',
    prompt: `Write a trend analysis post that positions Nebulaa as a thought leader. Structure:
- H1 with current year (e.g. "The State of AI-Powered GTM in India: What's Actually Working in 2025")
- The headline trend (what's changing and why it matters NOW)
- 3 sub-trends with specific examples from Indian startups
- What's overhyped vs. what's quietly working
- The specific tactics gaining traction right now
- What to prepare for in the next 6-12 months
- How to position yourself for this shift
- SEO phrases: "ai gtm india 2025", "b2b sales trends india", "startup marketing trends 2025"
- End with Nebulaa CTA
Tone: Analyst energy but founder-friendly. Data-backed. 800-1000 words.`,
    tags: ['trends', 'analysis', 'india', 'ai', 'gtm'],
    type: 'blog',
  },
  {
    id: 'case-study',
    title: 'How [Company Type] Got [Specific Result] Using Nebulaa',
    emoji: '🏆',
    prompt: `Write a compelling customer case study blog post. Structure:
- H1 with specific company type and result (e.g. "How a Bangalore SaaS Startup Got 40 Demo Calls in 30 Days Using Nebulaa's Gravity")
- Quick stats box: the key numbers at a glance
- The before: what the company was struggling with (be specific and relatable)
- Why they chose Nebulaa (what made them decide)
- The implementation: what they did in Week 1, 2, 3, 4
- The results: specific metrics, revenue impact, time saved
- Direct quote from the founder (make it feel real)
- What other companies can copy from this
- SEO phrases: "nebulaa case study", "ai marketing results india", "b2b lead generation results"
- End with CTA to get similar results
Tone: Journalistic, specific, credible. 800-1000 words.`,
    tags: ['case-study', 'results', 'proof'],
    type: 'blog',
  },
  {
    id: 'tools-roundup',
    title: 'The [X] Best Free Tools for [Indian/B2B] Founders in 2025',
    emoji: '🛠️',
    prompt: `Write an SEO-driven tools roundup post. Structure:
- H1: "The [10] Best Free GTM Tools for Indian B2B Founders in 2025"
- Quick intro: what criteria were used to pick these tools
- For each tool (cover 8-12 tools including Nebulaa):
  → Tool name + what it does
  → Best for: [specific use case]
  → Free plan: what you get
  → Rating: ⭐⭐⭐⭐⭐
- Comparison table at the end
- The verdict: which combination works best together
- SEO phrases: "free tools for indian startups", "b2b gtm tools free", "best saas tools india 2025"
- End with Nebulaa CTA (position it as the automation layer)
Tone: Helpful reviewer energy. Honest about limitations. 900-1100 words.`,
    tags: ['tools', 'roundup', 'seo', 'free-tools'],
    type: 'blog',
  },

  // ── NEWSLETTER IDEAS ──────────────────────────────────────────────────────
  {
    id: 'weekly-tip',
    title: '⚡ One GTM Trick That\'s Actually Working This Week',
    emoji: '⚡',
    prompt: `Write a punchy weekly newsletter with ONE actionable GTM tip. Rules:
- Subject line: "[⚡ This week:] [specific, intriguing subject]"
- Open: a 2-sentence hook that makes them glad they opened this
- The tip: ultra-specific, step-by-step, takes under 30 minutes to implement
- Why it works: 2-3 sentences of the psychology or logic behind it
- Your challenge: one specific action they can take TODAY
- Close: casual, like a WhatsApp message from a smart founder friend
- Total length: 200-300 words max
- Tone: Gen Z energy, real talk, emojis where natural
- End with Nebulaa CTA (one line, soft)`,
    tags: ['tip', 'weekly', 'actionable', 'short'],
    type: 'newsletter',
  },
  {
    id: 'founder-story',
    title: '🎯 What [Founder/Company] Did That We All Should Copy',
    emoji: '🎯',
    prompt: `Write a founder case study newsletter. Format:
- Subject line: Something that creates FOMO or curiosity about the specific story
- Open: drop immediately into the story (no preamble)
- The problem: what they were stuck on (make it relatable in 2-3 sentences)
- The insight: the one thing they figured out (be specific)
- The execution: what they actually did (step by step in bullets)
- The result: specific numbers or outcomes
- What YOU can steal from this (3 specific actions)
- Close: "Try this + let me know what happens 👇"
- 300-400 words max
- Tone: conversational, first-person, excited about sharing this
- End with Nebulaa CTA`,
    tags: ['case-study', 'founder', 'story', 'steal-this'],
    type: 'newsletter',
  },
  {
    id: 'whats-working',
    title: '📈 What\'s Working in [Month] (Straight From Founders)',
    emoji: '📈',
    prompt: `Write a "what's working right now" newsletter. Structure:
- Subject: "📈 What's actually working in [Month] (no fluff)"
- Intro: 2 sentences about what's changing in the current GTM landscape
- Section 1 — Content: the content format/topic getting the best results right now + why
- Section 2 — Outreach: the outreach tactic working right now + specific script/template
- Section 3 — Retention: one thing keeping customers longer + why it works
- Quick win of the week: one 15-minute action with immediate results
- What's NOT working (be honest — this builds trust)
- Close: "That's it for this week. Steal freely 👋"
- 400-500 words
- Tone: direct, bullet-heavy, no corporate speak
- End with Nebulaa CTA`,
    tags: ['monthly', 'whats-working', 'tactics'],
    type: 'newsletter',
  },
  {
    id: 'hot-take-newsletter',
    title: '🌶️ Okay Hear Me Out: [Hot Take That Will Divide Opinion]',
    emoji: '🌶️',
    prompt: `Write a spicy hot-take newsletter that founders want to forward to their co-founder. Structure:
- Subject: "okay hear me out: [the hot take in 8 words or less]"
- Open: State the controversial opinion immediately, no hedging
- Why I believe this: 3 specific reasons (use real examples or data)
- The counterargument: acknowledge what the other side gets right
- Why I still stand by it: the nuance that makes you right
- What this means for you: 1 specific action to take based on this take
- Close: "Agree or nah? Hit reply 👇" — actually engage with responses
- 300-400 words
- Tone: confident, conversational, willing to be wrong but mostly right
- End with Nebulaa CTA`,
    tags: ['hot-take', 'viral', 'gen-z', 'debate'],
    type: 'newsletter',
  },
  {
    id: 'product-update',
    title: '🚀 We Just Shipped [Feature] — Here\'s Why It Matters for You',
    emoji: '🚀',
    prompt: `Write an exciting product update newsletter that doesn't feel corporate. Structure:
- Subject: "🚀 [Benefit], not just a feature drop" (lead with what it does for them, not what it is)
- Open: story of why we built this (the pain we/customers felt)
- What we shipped: describe it in plain English, not jargon
- Why it matters: 3 specific ways it changes the user's workflow
- How to use it: 3 steps, simple
- Customer quote or reaction (real or realistic)
- What's coming next: 1 tease of the next thing
- Close: casual, excited, not corporate
- 300-400 words
- Tone: excited founder, not PR department
- End with CTA to try the feature`,
    tags: ['product', 'update', 'launch', 'feature'],
    type: 'newsletter',
  },
  {
    id: 'quick-win',
    title: '🏆 30-Minute Win: [Specific Tactic] That Actually Works',
    emoji: '🏆',
    prompt: `Write a "quick win" newsletter focused on one thing founders can implement in 30 minutes. Structure:
- Subject: "30 minutes → [specific result]"
- Open: "I'm going to give you something you can do in the next 30 minutes that will [specific outcome]"
- The win: EXTREMELY specific step-by-step (include actual script/template/prompt if relevant)
- Why this works: psychology or logic in 3 sentences
- Expected result: be honest about what to realistically expect
- The exact 5 steps to do it right now
- "Report back" — ask them to reply with results
- 250-350 words
- Tone: direct, helpful, insider-feeling
- End with Nebulaa CTA`,
    tags: ['quick-win', 'actionable', 'templates'],
    type: 'newsletter',
  },
  {
    id: 'deep-dive',
    title: '🔍 Deep Dive: The [Topic] Framework That Changed How We Think',
    emoji: '🔍',
    prompt: `Write a longer-form educational newsletter on a specific GTM framework or concept. Structure:
- Subject: "The [X] framework that changed how we think about [topic]"
- Open: what you thought before vs. the new mental model
- The framework: name it, explain it in 1 sentence
- How it works: 3-4 components with specific examples
- How to apply it: step-by-step for someone in their 0-18 month stage
- A real example of someone using it successfully
- The common mistake people make with this framework
- Your challenge: implement one element this week
- 500-600 words (this is the longer one — worth reading fully)
- Tone: smart but approachable, not academic
- End with Nebulaa CTA`,
    tags: ['deep-dive', 'framework', 'education'],
    type: 'newsletter',
  },
]

export const blogIdeas = contentIdeas.filter(i => i.type === 'blog' || i.type === 'both')
export const newsletterIdeas = contentIdeas.filter(i => i.type === 'newsletter' || i.type === 'both')
