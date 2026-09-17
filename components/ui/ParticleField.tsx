'use client'

import dynamic from 'next/dynamic'

const ParticleGlobeCanvas = dynamic(() => import('@/components/three/ParticleGlobeCanvas'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-ground animate-pulse" />,
})

interface Readout {
  label: string
  lines: string[]
  timer?: string
}

interface Props {
  height?: number
  readout?: Readout
  className?: string
  /** 'boxed' (default) = bordered card. 'fullbleed' = no box, meant to sit as an absolutely-positioned background layer. */
  variant?: 'boxed' | 'fullbleed'
  /** Swap the static dot texture for the cursor-reactive canvas field. Off by default — most uses (dark product mockups) want the calm, static motif. */
  interactive?: boolean
}

export default function ParticleField({ height = 520, readout, className = '', variant = 'boxed', interactive = false }: Props) {
  return (
    <div
      className={`overflow-hidden ${variant === 'boxed' ? 'relative rounded-3xl bg-[#0A0A0E] border border-white/[0.06]' : ''} ${className}`}
      style={variant === 'boxed' ? { height } : undefined}
    >
      {interactive ? (
        <ParticleGlobeCanvas className="absolute inset-0" interactive />
      ) : (
        <>
          <div className="neb-field" />
          <div className="neb-field-hot" />
          <div className="neb-halo" />
          {/* orbital rings */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/[0.16]" style={{ width: 300, height: 300 }} />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/[0.08]" style={{ width: 440, height: 440 }} />
          {/* core */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[54px] h-[54px] rounded-full"
            style={{
              background: 'radial-gradient(circle at 36% 32%, #FFE1AC 0%, #F5A623 52%, #8A5406 100%)',
              boxShadow: '0 0 60px 12px rgba(245,166,35,0.35)',
            }}
          />
        </>
      )}

      {readout && (
        <>
          <div className="absolute left-7 top-6 neb-label">{readout.label}</div>
          <div className="absolute left-7 bottom-6 flex flex-col gap-2.5">
            {readout.lines.map(line => (
              <div key={line} className="font-body text-[12.5px] text-ink-2 flex items-center gap-2.5">
                <span className="text-emerald-600 dark:text-[#4ADE80]">✓</span>
                {line}
              </div>
            ))}
          </div>
          {readout.timer && (
            <div className="absolute right-6 top-6 font-body text-[11px] tracking-[0.08em] text-muted tabular-nums">
              {readout.timer}
            </div>
          )}
        </>
      )}
    </div>
  )
}
