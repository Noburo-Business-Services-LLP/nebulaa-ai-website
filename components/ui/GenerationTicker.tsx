'use client'

import { Radar, MessageSquareText, Orbit as OrbitIcon } from 'lucide-react'

/**
 * A continuous horizontal strip of what the three engines are actually built
 * to do — a "the system never stops" motif, not a claim about a specific
 * live account. Each line maps to a real capability (see lib/productData.ts);
 * nothing here is invented functionality.
 *
 * Runs on real product footage the moment it exists: any card here is a stand-in
 * for a short looping clip. Until then it's the honest version — activity, not
 * a screenshot pretending to be one.
 */
const ACTIVITY = [
  { agent: 'gravity', icon: Radar, text: 'Drafted 3 reel concepts for launch week' },
  { agent: 'pulsar', icon: MessageSquareText, text: 'Qualified a WhatsApp enquiry in 42s' },
  { agent: 'orbit', icon: OrbitIcon, text: 'Found 18 businesses matching ICP in Coimbatore' },
  { agent: 'gravity', icon: Radar, text: 'Scheduled a Diwali carousel across 6 platforms' },
  { agent: 'pulsar', icon: MessageSquareText, text: 'Scored an inbound lead — handed to sales' },
  { agent: 'orbit', icon: OrbitIcon, text: 'Enriched 34 leads with verified emails' },
  { agent: 'gravity', icon: Radar, text: 'Answered a competitor mention on Instagram' },
  { agent: 'pulsar', icon: MessageSquareText, text: 'Sent a broadcast to 1,200 opted-in contacts' },
  { agent: 'orbit', icon: OrbitIcon, text: 'Pushed 6 qualified leads into the CRM, assigned' },
  { agent: 'gravity', icon: Radar, text: 'Rewrote a caption after last week\'s hook outperformed' },
  { agent: 'pulsar', icon: MessageSquareText, text: 'Booked a demo call from a cold WhatsApp reply' },
  { agent: 'gravity', icon: Radar, text: 'Flagged a rival\'s new campaign, drafted a response' },
]

/**
 * One colour for every engine. The three used to be gold, cyan and violet,
 * which made a strip of system telemetry read as three separate products
 * passing by. The icon identifies the engine; colour is not doing that job.
 */
function Card({ item }: { item: (typeof ACTIVITY)[number] }) {
  return (
    <div className="hud-card flex-shrink-0 flex items-center gap-3.5 rounded-full pl-4 pr-6 py-3 mx-2.5">
      <item.icon size={16} className="text-gold-text" />
      <span className="font-mono text-[12.5px] text-ink-2 whitespace-nowrap">{item.text}</span>
    </div>
  )
}

export default function GenerationTicker() {
  // Duplicated once for a seamless loop — the strip scrolls exactly one
  // copy's width, so the seam is invisible.
  const row = [...ACTIVITY, ...ACTIVITY]

  return (
    <div className="relative overflow-hidden py-4 border-y border-rule">
      <div className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-ground to-transparent" />
      <div className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-ground to-transparent" />
      <div className="flex w-max motion-safe:animate-[neb-ticker_38s_linear_infinite] hover:[animation-play-state:paused]">
        {row.map((item, i) => (
          <Card key={i} item={item} />
        ))}
      </div>
    </div>
  )
}
