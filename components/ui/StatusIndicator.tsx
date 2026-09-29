const TONE = {
  active: { dot: 'bg-wa', text: 'text-ink-2' },
  live: { dot: 'bg-gold', text: 'text-ink-2' },
  learning: { dot: 'bg-gold', text: 'text-ink-2' },
  idle: { dot: 'bg-faint', text: 'text-faint' },
} as const

export type StatusTone = keyof typeof TONE

/** A small dot and word. No glow, no pulse: it states a fact, it doesn't perform. */
export default function StatusIndicator({
  tone = 'active',
  label,
}: {
  tone?: StatusTone
  label?: string
  pulse?: boolean
}) {
  const t = TONE[tone]
  return (
    <span className="inline-flex items-center gap-[7px]">
      <span className={`w-[6px] h-[6px] rounded-full ${t.dot}`} />
      {label && <span className={`text-[11.5px] font-semibold ${t.text}`}>{label}</span>}
    </span>
  )
}
