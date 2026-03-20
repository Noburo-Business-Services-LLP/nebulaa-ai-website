'use client'
import GenericTool from './GenericTool'

const objectionTemplates: Record<string, string> = {
  'too expensive': `OBJECTION: "It's too expensive"

━━━ ACKNOWLEDGE ━━━
"Totally fair — budget is always a real consideration. I appreciate you being upfront about that."

━━━ CLARIFY ━━━
"Can I ask — is it that the price is outside your budget entirely, or is it more that you're not sure if the ROI is there yet?"

━━━ REFRAME (if budget question) ━━━
"Here's how our customers think about it: the average customer saves [X hours / ₹Y] per month. At our price, that's typically a 3-5x return in the first 90 days. Does that change how you're thinking about it?"

━━━ OR REFRAME (if value question) ━━━
"That's actually exactly why we offer [trial / demo / pilot]. You shouldn't pay full price until you've seen the value yourself. Can we start there?"

━━━ CLOSE ━━━
"If the ROI were clear, is budget the only thing standing in the way — or are there other concerns I should know about?"`,

  'not the right time': `OBJECTION: "The timing isn't right"

━━━ ACKNOWLEDGE ━━━
"I hear you — and honestly, there's rarely a perfect time for anything new."

━━━ CLARIFY ━━━
"Help me understand what's happening right now. Is it a resource issue, a priority issue, or something else?"

━━━ REFRAME ━━━
"The founders I talk to who say 'not right now' often come back 3 months later saying they wish they'd started sooner. The problem you're facing today doesn't get smaller while you wait.

What would have to be true for the timing to be right?"

━━━ BRIDGE ━━━
"What if we started small — a pilot that doesn't require full commitment? That way you're not risking much, but you're also not losing 3 months of potential progress."

━━━ CLOSE ━━━
"What's the one thing that would need to change for you to feel comfortable moving forward?"`,

  'need to think about it': `OBJECTION: "Let me think about it / I'll get back to you"

━━━ ACKNOWLEDGE ━━━
"Of course — this is a real decision and I want you to feel good about it."

━━━ UNCOVER THE REAL OBJECTION ━━━
"Before you go, can I ask — what specifically is giving you pause? I've found 'need to think about it' usually means one of three things: price, timing, or not being sure it'll work for your situation. Which one is it for you?"

━━━ ADDRESS IT DIRECTLY ━━━
[Address whichever concern they share]

━━━ SET A SPECIFIC NEXT STEP ━━━
"I don't want to lose you to your inbox. Can we schedule a follow-up for [specific day and time]? That way you have time to think, and we have a clear next step."

━━━ CLOSE ━━━
"What would make this a no-brainer for you? Let's see if we can get there."`,
}

const defaultTemplate = (objection: string) => `OBJECTION: "${objection}"

━━━ ACKNOWLEDGE ━━━
"That's a completely valid concern — I appreciate you sharing that with me."

━━━ CLARIFY ━━━
"Before I respond, can I ask what's behind that? I want to make sure I'm addressing what's actually on your mind, not just the surface-level concern."

━━━ REFRAME ━━━
"Here's how I'd think about it: [Restate the problem they're solving. Connect your solution directly to their specific situation. Use a specific number or customer example if you have one.]"

━━━ VALIDATE + PIVOT ━━━
"Does that address the concern, or is there something else underneath it I should know about?"

━━━ CLOSE ━━━
"What would need to be true for you to feel confident moving forward?"

━━━ UNIVERSAL TIPS ━━━
→ Never argue. Acknowledge first, always.
→ The stated objection is rarely the real one — dig for it
→ One specific customer story > ten logical arguments
→ End with a question, never a statement`

const templates = [
  (v: Record<string, string>) => {
    const objection = v.objection.toLowerCase()
    if (objection.includes('expensive') || objection.includes('price') || objection.includes('cost') || objection.includes('budget')) {
      return objectionTemplates['too expensive']
    }
    if (objection.includes('time') || objection.includes('timing') || objection.includes('busy') || objection.includes('later') || objection.includes('quarter')) {
      return objectionTemplates['not the right time']
    }
    if (objection.includes('think') || objection.includes('get back') || objection.includes('consider') || objection.includes('discuss')) {
      return objectionTemplates['need to think about it']
    }
    return defaultTemplate(v.objection)
  },
]

export default function SalesObjectionHandler() {
  return (
    <GenericTool
      fields={[
        { key: 'objection', label: 'What objection are you hearing?', type: 'textarea', placeholder: "e.g. \"It's too expensive\" or \"We already have a solution\" or \"Not the right time\"", rows: 2 },
      ]}
      templates={templates}
      outputLabel="Your Objection Response Framework"
      buttonLabel="Handle This Objection"
      tip="The best salespeople make prospects feel heard before they respond. Always acknowledge, then clarify, then reframe."
    />
  )
}
