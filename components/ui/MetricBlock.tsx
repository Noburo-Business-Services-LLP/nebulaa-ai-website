/**
 * A single readout in a metrics row — the number, what it counts, and
 * optionally how it moved. Tabular figures so a row of these stays aligned
 * while values update rather than jittering.
 */
export default function MetricBlock({
  value,
  label,
  delta,
  tone = 'neutral',
}: {
  value: string | number
  label: string
  delta?: string
  tone?: 'neutral' | 'gold' | 'positive'
}) {
  const valueTone =
    tone === 'gold' ? 'text-gold-text' : tone === 'positive' ? 'text-emerald-400' : 'text-ink'

  return (
    <div className="flex flex-col gap-1">
      <span className={`font-heading text-[26px] leading-none tabular-nums ${valueTone}`}>
        {value}
      </span>
      <span className="neb-label leading-tight">{label}</span>
      {delta && <span className="neb-label text-emerald-400 leading-tight">{delta}</span>}
    </div>
  )
}
