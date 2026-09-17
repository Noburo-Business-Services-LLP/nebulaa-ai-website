'use client'

import type { ReactNode } from 'react'
import { soundEngine } from '@/lib/soundEngine'

interface Props {
  children: ReactNode
  className?: string
  /** Which corner glows. 'none' skips the halo entirely — for dense grids where six glowing corners would be noise. */
  halo?: 'amber' | 'cyan' | 'none'
  /** Plays the HUD tick on hover. Off by default for large text blocks; on for anything that reads as a discrete "tile." */
  sound?: boolean
}

/**
 * The glass HUD panel look from the hero (backdrop blur, hairline border,
 * corner glow), as a reusable surface for the rest of the site — replacing
 * the plain `bg-surface border border-rule` card used everywhere pre-redesign.
 *
 * Built from the .hud-card / .halo-amber / .halo-cyan utilities already
 * defined in globals.css for the hero's telemetry panel; this just makes
 * them a component other sections can drop in without duplicating markup.
 */
export default function HudCard({ children, className = '', halo = 'amber', sound = true }: Props) {
  const haloClass = halo === 'amber' ? 'halo-amber' : halo === 'cyan' ? 'halo-cyan' : ''

  return (
    <div
      className={`hud-card rounded-[18px] relative overflow-hidden ${haloClass} ${className}`}
      onMouseEnter={sound ? () => soundEngine.playHudHover() : undefined}
    >
      <div className="relative z-10">{children}</div>
    </div>
  )
}
