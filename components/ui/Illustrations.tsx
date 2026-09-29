import { Users, Cpu, Heart, Target, BadgeCheck, Sparkles } from 'lucide-react'

/**
 * Three small moving pictures for the managed-services "why us" cards. Pure
 * CSS motion, no images needed: overlapping people who merge into one team,
 * a machine and a person joined by a moving dot, and a target that pulses.
 */

export function TeamIllustration() {
  return (
    <div className="relative h-[120px] flex items-center justify-center" aria-hidden="true">
      {[
        { c: 'bg-peach', x: -46, d: '0s' },
        { c: 'bg-sky', x: 0, d: '0.5s' },
        { c: 'bg-lav', x: 46, d: '1s' },
      ].map((p, i) => (
        <span
          key={i}
          className={`neb-bob absolute w-[74px] h-[74px] rounded-full ${p.c} border-[3px] border-white flex items-center justify-center shadow-[0_10px_24px_rgba(20,32,58,0.12)]`}
          style={{ transform: `translateX(${p.x}px)`, animationDelay: p.d, zIndex: i === 1 ? 2 : 1 }}
        >
          <Users size={30} className="text-ink" strokeWidth={1.7} />
        </span>
      ))}
      <span className="absolute bottom-1 right-[22%] z-10 w-9 h-9 rounded-full bg-wa text-white flex items-center justify-center border-[3px] border-white shadow-md">
        <BadgeCheck size={18} />
      </span>
    </div>
  )
}

export function MachineAndPersonIllustration() {
  return (
    <div className="relative h-[120px] flex items-center justify-center gap-0" aria-hidden="true">
      <span className="neb-bob w-[76px] h-[76px] rounded-2xl bg-sky border-[3px] border-white flex items-center justify-center shadow-[0_10px_24px_rgba(20,32,58,0.12)]">
        <Cpu size={32} className="text-ink" strokeWidth={1.7} />
      </span>
      <span className="relative w-[70px] h-[3px] mx-1 border-t-[3px] border-dashed border-coral">
        <span className="neb-travel absolute -top-[7px] left-0 w-[11px] h-[11px] rounded-full bg-coral" />
      </span>
      <span className="neb-bob w-[76px] h-[76px] rounded-2xl bg-peach border-[3px] border-white flex items-center justify-center shadow-[0_10px_24px_rgba(20,32,58,0.12)]" style={{ animationDelay: '0.9s' }}>
        <Heart size={32} className="text-ink" strokeWidth={1.7} />
      </span>
    </div>
  )
}

export function TargetIllustration() {
  return (
    <div className="relative h-[120px] flex items-center justify-center" aria-hidden="true">
      <span className="neb-ring absolute w-[110px] h-[110px] rounded-full border-[3px] border-coral/40" />
      <span className="neb-ring absolute w-[110px] h-[110px] rounded-full border-[3px] border-coral/40" style={{ animationDelay: '1.2s' }} />
      <span className="absolute w-[84px] h-[84px] rounded-full bg-mint border-[3px] border-white" />
      <span className="neb-bob relative w-[58px] h-[58px] rounded-full bg-surface border-[3px] border-white flex items-center justify-center shadow-md">
        <Target size={28} className="text-ink" strokeWidth={1.8} />
      </span>
      <Sparkles size={20} className="neb-bob absolute top-2 right-[26%] text-gold" style={{ animationDelay: '0.6s' }} />
    </div>
  )
}
