'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check, Wand2, RefreshCw } from 'lucide-react'

const templates = {
  storytelling: [
    (topic: string) => `I used to struggle with ${topic}. Every day felt like I was going in circles.

Then one day, I decided to do something different.

I stopped trying to figure it out alone and started paying attention to what was actually working.

Here's what I learned:

→ Start with clarity, not complexity
→ Small daily actions compound faster than big sporadic ones
→ The people winning aren't smarter — they're more consistent

If you're still stuck on ${topic}, this is your sign to change the approach.

What's one thing you've changed recently that made a difference? 👇

#Founder #Growth #${topic.replace(/\s+/g, '')} #StartupLife #Entrepreneurship`,

    (topic: string) => `Nobody told me ${topic} would be this hard.

6 months in, I almost quit.

Here's the honest story:

Month 1: I tried everything I read online. Nothing stuck.
Month 2: I doubled down on one thing. Still no results.
Month 3: I had a conversation that changed everything.

The turning point wasn't a strategy. It was a mindset shift.

I stopped asking "how do I grow?" and started asking "what does my customer actually need?"

That one reframe built everything I have today.

If you're early in your ${topic} journey — hang in there. The breakthrough is closer than you think.

Drop a 🙌 if this hit home.

#Entrepreneurship #${topic.replace(/\s+/g, '')} #FounderLife #Mindset #Startup`,
  ],

  professional: [
    (topic: string) => `${topic} is one of the most overlooked growth levers for early-stage founders.

Here are 5 things I wish I knew earlier:

1. You don't need a big team — you need the right systems
2. Consistency beats perfection every single time
3. Your ICP matters more than your product at early stage
4. The best marketing is a product people talk about
5. Automate what drains you. Double down on what scales

The founders who crack ${topic} early are the ones who hit consistent revenue without burning out.

Save this post for when you need a reminder. 🔖

#B2BSaaS #FounderLife #${topic.replace(/\s+/g, '')} #GrowthHacking #Startup`,

    (topic: string) => `3 mistakes founders make with ${topic} — and how to avoid them:

Mistake #1: Starting without a clear ICP
→ Fix: Define your top 3 customer profiles before doing anything else

Mistake #2: Trying to be everywhere at once
→ Fix: Pick ONE channel. Own it for 90 days before expanding

Mistake #3: Measuring the wrong metrics
→ Fix: Track inputs (activities) not just outputs (results)

Most ${topic} problems aren't strategy problems. They're focus problems.

What would you add? 👇

#Marketing #Founder #${topic.replace(/\s+/g, '')} #GTM #BusinessGrowth`,
  ],

  contrarian: [
    (topic: string) => `Hot take: Most advice about ${topic} is completely wrong.

Here's what the "experts" won't tell you:

The conventional approach fails 80% of the time.

Why? Because it was designed for companies with unlimited budgets and 50-person teams.

You're a founder with 3 hats, 12-hour days, and real revenue pressure.

What actually works:
→ Ignore the playbooks. Study what YOUR competitors are doing
→ Talk to 5 customers before writing a single post
→ Distribution > content. Always.

${topic} doesn't have to be complicated. It just has to be consistent.

Agree or disagree? 👇

#UnpopularOpinion #Founder #Marketing #${topic.replace(/\s+/g, '')} #GrowthStrategy`,

    (topic: string) => `Everyone is doing ${topic} wrong.

And I used to be one of them.

The lie we're sold: "Just follow the framework and it works."

The truth: frameworks are starting points, not answers.

Here's what no one talks about:

The founders crushing it with ${topic} aren't following playbooks. They're obsessing over their specific customer in their specific market.

Generic advice → generic results.

Stop copying. Start studying.

Your customers will tell you exactly what works if you listen.

What's the most overrated ${topic} advice you've heard? 👇

#RealTalk #Founder #${topic.replace(/\s+/g, '')} #Marketing #StartupAdvice`,
  ],

  howto: [
    (topic: string) => `How to master ${topic} in 30 days — even if you have zero time:

Week 1: Audit what you have
→ What's working? What isn't?
→ Where are people dropping off?
→ What does your best customer look like?

Week 2: Build the foundation
→ Pick one channel and own it
→ Create a repeatable system
→ Set a non-negotiable daily habit

Week 3: Execute and iterate
→ Ship fast, learn faster
→ Track one metric that matters
→ Say no to everything that doesn't move the needle

Week 4: Scale what works
→ Document your process
→ Delegate or automate
→ Do more of what's working

${topic} isn't a sprint. It's a system.

Save this and come back in 30 days. 💪

#Productivity #Founder #${topic.replace(/\s+/g, '')} #GrowthHacks #Entrepreneurship`,

    (topic: string) => `The exact 5-step process I use for ${topic}:

Step 1: Define the outcome
→ What does success look like in 90 days?
→ Write it down. Make it specific.

Step 2: Map the constraints
→ Time, budget, team, skills
→ Work within them, not against them

Step 3: Pick the highest-leverage action
→ One thing. Not five. One.
→ Do it every day for 2 weeks before adding more.

Step 4: Track and adjust weekly
→ Same day each week. 30 minutes.
→ What worked? What didn't? What's next?

Step 5: Share what you learn
→ Teaching = the fastest way to master anything
→ LinkedIn posts count 😉

${topic} becomes simple when you strip away the noise.

Save this. You'll need it. 📌

#SystemsThinking #${topic.replace(/\s+/g, '')} #Founder #Productivity #Growth`,
  ],
}

export default function LinkedInPostGenerator() {
  const [topic, setTopic] = useState('')
  const [tone, setTone] = useState('storytelling')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [variantIndex, setVariantIndex] = useState(0)

  const generate = () => {
    if (!topic.trim()) return
    const toneTemplates = templates[tone as keyof typeof templates]
    const idx = Math.floor(Math.random() * toneTemplates.length)
    setVariantIndex(idx)
    setOutput(toneTemplates[idx](topic.trim()))
    setGenerated(true)
  }

  const regenerate = () => {
    if (!topic.trim()) return
    const toneTemplates = templates[tone as keyof typeof templates]
    const nextIdx = (variantIndex + 1) % toneTemplates.length
    setVariantIndex(nextIdx)
    setOutput(toneTemplates[nextIdx](topic.trim()))
  }

  const copy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="bg-surface-2 rounded-2xl p-6 border border-rule">
        <div className="space-y-4">
          <div>
            <label className="font-body text-sm font-semibold text-ink block mb-2">
              What&apos;s your post about?
            </label>
            <textarea
              value={topic}
              onChange={e => setTopic(e.target.value)}
              rows={3}
              placeholder="e.g. 'cold outreach for B2B founders' or 'why I stopped using spreadsheets'"
              className="w-full border border-rule bg-surface-2 text-ink rounded-xl px-4 py-3 font-body text-sm resize-none outline-none focus:border-gold transition-colors placeholder:text-muted"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-body text-sm font-semibold text-ink block mb-2">Tone</label>
              <select
                value={tone}
                onChange={e => setTone(e.target.value)}
                className="w-full border border-rule bg-surface-2 text-ink rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-gold transition-colors"
              >
                <option value="storytelling">Storytelling</option>
                <option value="professional">Professional / List</option>
                <option value="contrarian">Contrarian / Hot take</option>
                <option value="howto">How-to / Step-by-step</option>
              </select>
            </div>
          </div>
          <button
            onClick={generate}
            disabled={!topic.trim()}
            className="flex items-center gap-2 bg-gold text-[#1A1208] font-body font-semibold rounded-full px-6 py-3 hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02]"
          >
            <Wand2 size={16} />
            Generate Post
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
              <span className="font-body text-sm font-semibold text-ink">Your LinkedIn Post</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={regenerate}
                  className="flex items-center gap-1.5 font-body text-xs font-semibold text-muted hover:text-ink transition-colors"
                >
                  <RefreshCw size={12} />
                  Try another
                </button>
                <button
                  onClick={copy}
                  className="flex items-center gap-1.5 font-body text-xs font-semibold text-gold-text hover:text-gold-text-dim transition-colors"
                >
                  {copied ? <><Check size={12} />Copied!</> : <><Copy size={12} />Copy</>}
                </button>
              </div>
            </div>
            <div className="p-5">
              <pre className="font-body text-sm text-ink whitespace-pre-wrap leading-relaxed">{output}</pre>
            </div>
            <div className="px-5 py-3 bg-gold/5 border-t border-rule">
              <p className="font-body text-xs text-muted">
                💡 Tip: Customize the post with your personal experience for 3x more engagement. Want this automated daily?{' '}
                <a href="/pricing" className="text-gold-text hover:underline">Try Gravity →</a>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
