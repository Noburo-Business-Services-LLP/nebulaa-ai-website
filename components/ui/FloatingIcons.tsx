import type { LucideIcon } from 'lucide-react'

const SPOTS = [
  { top: '6%', left: '18%', size: 84, tint: 'bg-peach', delay: '0s' },
  { top: '2%', left: '62%', size: 64, tint: 'bg-sky', delay: '0.8s' },
  { top: '34%', left: '4%', size: 68, tint: 'bg-mint', delay: '1.6s' },
  { top: '38%', left: '44%', size: 96, tint: 'bg-sun/70', delay: '0.4s' },
  { top: '66%', left: '20%', size: 70, tint: 'bg-lav', delay: '2.2s' },
  { top: '70%', left: '66%', size: 78, tint: 'bg-peach', delay: '1.2s' },
]

/** Six soft icon bubbles that drift up and down, filling the empty side of a hero. */
export default function FloatingIcons({ icons, className = '' }: { icons: LucideIcon[]; className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      {SPOTS.map((s, i) => {
        const Icon = icons[i % icons.length]
        return (
          <span
            key={i}
            className={`neb-bob absolute flex items-center justify-center rounded-full ${s.tint} border border-white/60 shadow-[0_12px_28px_rgba(20,32,58,0.12)]`}
            style={{ top: s.top, left: s.left, width: s.size, height: s.size, animationDelay: s.delay }}
          >
            <Icon size={Math.round(s.size * 0.42)} className="text-ink" strokeWidth={1.8} />
          </span>
        )
      })}
    </div>
  )
}
