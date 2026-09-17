import type { ReactNode } from 'react'
import StatusIndicator, { type StatusTone } from '@/components/ui/StatusIndicator'

interface Props {
  children: ReactNode
  className?: string
  /** Small technical label in the panel's header row. Omit for a bare panel. */
  label?: string
  /** Status shown at the right of the header row. */
  status?: { tone?: StatusTone; label: string }
  /** Lights the top edge — for the panel that is currently the subject. */
  lit?: boolean
  /** Removes body padding, for panels whose children manage their own spacing. */
  flush?: boolean
}

/**
 * A module of the operating system. Deliberately not a marketing card: it
 * carries a technical label and a status rather than an icon and a heading,
 * because a panel that reports its own state reads as something running.
 *
 * Use this for interface surfaces. HudCard remains the softer, glassier
 * treatment for editorial blocks.
 */
export default function SystemPanel({
  children,
  className = '',
  label,
  status,
  lit = false,
  flush = false,
}: Props) {
  const hasHeader = Boolean(label || status)

  return (
    <div className={`neb-panel ${lit ? 'neb-panel-lit' : ''} overflow-hidden ${className}`}>
      {hasHeader && (
        <div className="neb-panel-rule flex items-center justify-between gap-4 px-4 py-[11px]">
          {label && <span className="neb-label">{label}</span>}
          {status && <StatusIndicator tone={status.tone} label={status.label} />}
        </div>
      )}
      <div className={flush ? '' : 'p-4'}>{children}</div>
    </div>
  )
}
