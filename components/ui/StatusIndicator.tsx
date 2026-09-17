const TONE = {
  active: { dot: 'bg-emerald-400', text: 'text-emerald-400', glow: 'rgba(52,211,153,0.6)' },
  live: { dot: 'bg-gold', text: 'text-gold-text', glow: 'rgba(245,166,35,0.6)' },
  learning: { dot: 'bg-gold', text: 'text-gold-text', glow: 'rgba(245,166,35,0.6)' },
  idle: { dot: 'bg-faint', text: 'text-faint', glow: 'transparent' },
} as const

export type StatusTone = keyof typeof TONE

/**
 * The system-status dot. Every state the interface reports goes through this
 * so "active" looks identical in the hero, an agent card and a product
 * console — a status light means one thing across the whole system.
 */
export default function StatusIndicator({
  tone = 'active',
  label,
  pulse = true,
}: {
  tone?: StatusTone
  label?: string
  pulse?: boolean
}) {
  const t = TONE[tone]
  return (
    <span className="inline-flex items-center gap-[7px]">
      <span className="relative flex items-center justify-center">
        <span
          className={`w-[5px] h-[5px] rounded-full ${t.dot}`}
          style={t.glow !== 'transparent' ? { boxShadow: `0 0 8px ${t.glow}` } : undefined}
        />
        {pulse && t.glow !== 'transparent' && (
          <span className={`absolute w-[5px] h-[5px] rounded-full ${t.dot} animate-ping opacity-60`} />
        )}
      </span>
      {label && <span className={`neb-label ${t.text}`}>{label}</span>}
    </span>
  )
}
