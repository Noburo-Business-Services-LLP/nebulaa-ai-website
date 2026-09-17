'use client'

import type { ReactNode } from 'react'
import { soundEngine } from '@/lib/soundEngine'
import StatusIndicator, { type StatusTone } from '@/components/ui/StatusIndicator'

interface Props {
  children: ReactNode
  className?: string
  /** Which corner glows. 'none' skips the halo entirely — for dense grids where six glowing corners would be noise. */
  halo?: 'amber' | 'cyan' | 'none'
  /** Plays the HUD tick on hover. Off by default for large text blocks; on for anything that reads as a discrete "tile." */
  sound?: boolean
  /** Small technical label in the panel's header row. Omit for a bare panel. */
  label?: string
  /** Status shown at the right of the header row. */
  status?: { tone?: StatusTone; label: string }
  /** Removes body padding, for panels whose children manage their own spacing. */
  flush?: boolean
}

/**
 * The glass HUD panel look from the hero (backdrop blur, hairline border,
 * corner glow), as the one reusable surface for the rest of the site —
 * replacing both the plain `bg-surface border border-rule` card used
 * everywhere pre-redesign, and the flatter `SystemPanel` interface-panel
 * treatment, so a card looks the same whether it's editorial or operational.
 * The optional label/status header row is what `SystemPanel` used to provide.
 *
 * Built from the .hud-card / .halo-amber / .halo-cyan utilities already
 * defined in globals.css for the hero's telemetry panel.
 */
export default function HudCard({
  children,
  className = '',
  halo = 'amber',
  sound = true,
  label,
  status,
  flush = false,
}: Props) {
  const haloClass = halo === 'amber' ? 'halo-amber' : halo === 'cyan' ? 'halo-cyan' : ''
  const hasHeader = Boolean(label || status)

  return (
    <div
      className={`hud-card rounded-[18px] relative overflow-hidden ${haloClass} ${className}`}
      onMouseEnter={sound ? () => soundEngine.playHudHover() : undefined}
    >
      <div className="relative z-10">
        {hasHeader && (
          <div className="flex items-center justify-between gap-4 px-4 py-[11px] border-b border-rule-2">
            {label && <span className="neb-label">{label}</span>}
            {status && <StatusIndicator tone={status.tone} label={status.label} />}
          </div>
        )}
        <div className={flush ? '' : hasHeader ? 'p-4' : ''}>{children}</div>
      </div>
    </div>
  )
}
