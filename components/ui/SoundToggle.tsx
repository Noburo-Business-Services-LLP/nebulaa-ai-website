'use client'

import { useEffect, useState } from 'react'
import { soundEngine } from '@/lib/soundEngine'

export default function SoundToggle({ className = '' }: { className?: string }) {
  const [active, setActive] = useState(false)

  useEffect(() => {
    const unsub = soundEngine.subscribe(enabled => {
      setActive(enabled)
    })
    return unsub
  }, [])

  const handleToggle = () => {
    soundEngine.toggle()
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      onMouseEnter={() => soundEngine.playHudHover()}
      className={`hud-pill group flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
        active
          ? 'text-gold border-gold/40 bg-gold/10 shadow-[0_0_15px_rgba(245,166,35,0.25)]'
          : 'text-muted hover:text-white border-white/[0.12] hover:border-white/30'
      } ${className}`}
      title={active ? 'Disable atmospheric audio' : 'Enable atmospheric deep-space audio & HUD SFX'}
      aria-label="Toggle atmospheric sound"
    >
      {/* Animated Equalizer Waveform */}
      <div className="flex items-center gap-[3px] h-3.5 px-0.5">
        <span
          className={`w-[2.5px] rounded-full transition-all duration-300 ${
            active
              ? 'bg-gold animate-[bounce_1.2s_infinite_ease-in-out] h-3.5'
              : 'bg-muted/60 h-1.5 group-hover:bg-white/70'
          }`}
        />
        <span
          className={`w-[2.5px] rounded-full transition-all duration-300 ${
            active
              ? 'bg-gold animate-[bounce_0.8s_infinite_ease-in-out_0.2s] h-2.5'
              : 'bg-muted/60 h-2 group-hover:bg-white/70'
          }`}
        />
        <span
          className={`w-[2.5px] rounded-full transition-all duration-300 ${
            active
              ? 'bg-gold animate-[bounce_1s_infinite_ease-in-out_0.4s] h-3'
              : 'bg-muted/60 h-1 group-hover:bg-white/70'
          }`}
        />
      </div>

      <span className="tracking-wider uppercase text-[11px] font-medium">
        {active ? 'Audio: Live' : 'Sound off'}
      </span>
    </button>
  )
}
