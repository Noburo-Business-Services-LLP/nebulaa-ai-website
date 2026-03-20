'use client'
import GenericTool from './GenericTool'

const templates = [
  (v: Record<string, string>) => {
    const t = v.topic
    const tone = v.tone
    if (tone === 'How-to') return `🧵 THREAD: How to ${t} (most founders get this wrong)

1/ I spent 90 days learning exactly how to ${t}.

Here's the complete playbook — step by step. 👇

2/ Step 1: Start with the outcome, not the action.

Most people jump straight into doing.

The ones who win? They define what success looks like first.

3/ Step 2: Audit what you already have.

You're not starting from zero. You have:
→ Existing customers (talk to them)
→ Past data (analyze it)
→ A network (use it)

4/ Step 3: Pick ONE channel and own it for 30 days.

Not LinkedIn AND Twitter AND Instagram.

One. That's it.

Consistency > everything else.

5/ Step 4: Track one metric that tells you if it's working.

Not vanity metrics. Real ones.

Revenue. Pipeline. Responses. Whatever moves the needle.

6/ Step 5: Double down on what works. Kill what doesn't.

After 30 days, you'll know exactly what's working.

Do more of that. Cut everything else.

7/ The honest truth:

${t} isn't complicated. It's just not easy.

The difference between people who figure it out and people who don't?

Execution.

8/ If this was useful, follow me for more founder playbooks.

And reply with what's blocking you — I read every response 👇

RT the first tweet if this helped 🙏`
    if (tone === 'Hot take') return `🧵 Okay, controversial take about ${t}. Bear with me.

1/ Hot take: 90% of what you've been told about ${t} is either wrong or designed for someone with 10x your budget.

Let me explain. 👇

2/ The conventional wisdom says:

→ Do X
→ Then Y
→ Then Z

Sounds logical, right?

Here's why it fails for most founders.

3/ The system is designed for companies that can afford to be slow.

You don't have that luxury.

You need things that work NOW. At YOUR scale.

4/ What actually works (based on talking to 50+ founders):

→ [Tactic 1 related to ${t}]
→ [Tactic 2 related to ${t}]
→ [Tactic 3 related to ${t}]

None of them are in the playbooks.

5/ The real insight: Stop copying what big companies do.

Study what OTHER founders at your stage are doing.

That's the actual benchmark.

6/ The people crushing ${t} right now aren't smarter than you.

They just stopped following advice meant for someone else.

7/ So the next time someone tells you "the right way" to do ${t}:

Ask them: "At what stage? With what resources?"

Context matters more than tactics.

8/ If this made you think differently, follow for more contrarian founder takes.

Drop your biggest ${t} frustration below 👇`
    return `🧵 I was doing ${t} completely wrong for 6 months.

Then one thing changed everything. Thread 👇

1/ Six months ago, I was grinding on ${t} with zero results.

Not for lack of trying. I was trying HARD.

The problem was I was optimizing for the wrong thing.

2/ What I was doing:
❌ Following generic advice
❌ Copying what worked for others
❌ Measuring the wrong metrics

3/ What actually changed everything:

I stopped asking "how do I do this?" and started asking "what does success actually look like for me?"

That reframe was everything.

4/ Once I knew the actual destination, the path became obvious.

Three things I stopped doing:
→ Wasting time on channels that don't convert
→ Creating content nobody asked for
→ Measuring activity instead of outcomes

5/ Three things I started doing instead:
→ Talking to my best customers weekly
→ Doubling down on what was already working
→ Tracking ONE metric that matters

6/ The result? ${t} became the most predictable part of my business.

Not because I worked harder. Because I worked differently.

7/ Lesson: You're probably not failing at ${t}.

You're just optimizing for the wrong version of success.

Fix the goal. The process becomes obvious.

8/ If this resonated, follow me — I share raw founder learnings weekly.

What's YOUR biggest ${t} struggle right now? 👇`
  },
]

export default function TwitterThreadGenerator() {
  return (
    <GenericTool
      fields={[
        { key: 'topic', label: "What's your thread about?", type: 'textarea', placeholder: "e.g. 'cold outreach for B2B founders' or 'how I scaled to ₹1Cr ARR'", rows: 2 },
        { key: 'tone', label: 'Tone', type: 'select', options: ['Storytelling', 'How-to', 'Hot take'] },
      ]}
      templates={templates}
      outputLabel="Your Twitter Thread"
      buttonLabel="Generate Thread"
      tip="Pin your best threads for 3x more profile visits. Add a follow CTA at the end for consistent growth."
    />
  )
}
