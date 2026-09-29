import type { ReactNode } from 'react'

/**
 * A slow, endless strip that pauses on hover. The items are rendered twice so
 * the loop has no seam; the second copy is hidden from screen readers and,
 * with reduced motion on, from everyone (the strip then just wraps).
 */
export default function Marquee({
  children,
  speed = 45,
  className = '',
}: {
  children: ReactNode
  /** Seconds for one full pass. Higher is slower. */
  speed?: number
  className?: string
}) {
  return (
    <div className={`neb-marquee-wrap neb-marquee-mask overflow-hidden ${className}`}>
      <div className="neb-marquee" style={{ ['--marquee-speed' as string]: `${speed}s` }}>
        <div className="flex items-center gap-4 pr-4">{children}</div>
        <div className="flex items-center gap-4 pr-4" aria-hidden="true">{children}</div>
      </div>
    </div>
  )
}
