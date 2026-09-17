'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ParticleField from '@/components/ui/ParticleField'
import { fadeUpVariant, staggerContainer } from '@/lib/animations'
import { soundEngine } from '@/lib/soundEngine'
import StatCounter from '@/components/ui/StatCounter'
import { ArrowRight, ShieldCheck, Zap, Activity, Cpu, Orbit as OrbitIcon } from 'lucide-react'

export default function Hero() {
  const [url, setUrl] = useState('')
  const [activeAgent, setActiveAgent] = useState<'gravity' | 'orbit' | 'pulsar'>('gravity')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    soundEngine.playHudActivate()
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleAgentSelect = (agent: 'gravity' | 'orbit' | 'pulsar') => {
    soundEngine.playHudHover()
    setActiveAgent(agent)
  }

  return (
    <section className="relative bg-ground min-h-screen pt-36 pb-28 px-6 md:px-12 lg:px-[120px] overflow-hidden flex items-center">
      {/* Ambient particle field background */}
      <div className="absolute inset-0 z-0">
        <ParticleField variant="fullbleed" interactive className="absolute inset-0" />
        {/* Soft edge gradients so copy and HUD stay razor-sharp */}
        <div className="absolute inset-0 bg-gradient-to-r from-ground via-ground/75 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-ground/40 via-transparent to-ground pointer-events-none" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full grid lg:grid-cols-12 gap-12 lg:gap-16 items-center"
      >
        {/* Left — High-Tech Copy & URL Scanner (Col 7) */}
        <div className="lg:col-span-7">
          {/* Telemetry Status Eyebrow */}
          <motion.div variants={fadeUpVariant} className="mb-6">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-md text-[11.5px] font-mono tracking-wider text-muted">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-ink/80 font-medium">NEBULAA // BUSINESS OPERATING SYSTEM</span>
              <span className="text-white/20">|</span>
              <span className="text-gold/90 font-semibold">ONLINE</span>
            </div>
          </motion.div>

          {/* Headline with Space Grotesk deep-tech presence */}
          <motion.h1
            variants={fadeUpVariant}
            className="font-heading text-[42px] sm:text-[56px] lg:text-[68px] leading-[1.04] tracking-[-0.03em] font-semibold text-white mb-6"
            style={{ textWrap: 'pretty' }}
          >
            Give us a URL.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-300 to-amber-500 drop-shadow-[0_0_25px_rgba(245,166,35,0.35)]">
              We&apos;ll run your marketing.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUpVariant}
            className="text-[17px] sm:text-[18px] leading-[1.65] text-ink-2 max-w-[560px] mb-9"
          >
            Your competitor isn&apos;t better — they&apos;re just louder. Nebulaa maps your brand in 60 seconds, engineers your entire content roadmap, drafts daily high-signal posts, and qualifies incoming WhatsApp leads in real time.
          </motion.p>

          {/* Cybernetic URL Scanner Entry */}
          <motion.form
            variants={fadeUpVariant}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-[520px] mb-4"
          >
            <div className="relative flex-1 group">
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-gold/30 to-amber-500/20 opacity-40 group-hover:opacity-100 blur-sm transition duration-300" />
              <input
                type="text"
                value={url}
                onChange={e => setUrl(e.target.value)}
                onFocus={() => soundEngine.playHudHover()}
                placeholder="Enter your website: yourbrand.com"
                className="relative w-full bg-[#08080E] border border-white/[0.14] group-hover:border-gold/60 rounded-full px-6 py-4 text-[15px] text-white placeholder:text-muted/60 outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all font-mono"
              />
            </div>

            <button
              type="submit"
              onMouseEnter={() => soundEngine.playHudHover()}
              className="relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gold to-amber-500 text-black font-semibold text-[15px] px-8 py-4 rounded-full shadow-[0_0_28px_rgba(245,166,35,0.4)] hover:brightness-110 hover:shadow-[0_0_36px_rgba(245,166,35,0.6)] transition-all whitespace-nowrap active:scale-[0.98]"
            >
              <span>Initialize Engine</span>
              <ArrowRight size={16} />
            </button>
          </motion.form>

          {/* Micro Guarantee Metadata */}
          <motion.div variants={fadeUpVariant} className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[12.5px] font-mono text-muted mb-6">
            <span className="flex items-center gap-1.5 text-white/80">
              <ShieldCheck size={14} className="text-emerald-400" />
              100 Free Credits
            </span>
            <span className="text-white/20">·</span>
            <span>No Credit Card</span>
            <span className="text-white/20">·</span>
            <span>Setup in 60s</span>
            <span className="text-white/20">·</span>
            <a href="/services" className="text-gold/90 hover:underline hover:text-gold transition">
              Managed Enterprise Shape →
            </a>
          </motion.div>
        </div>

        {/* Right — Sci-Fi HUD Telemetry Deck (Col 5, Language Explorer style) */}
        <motion.div
          variants={fadeUpVariant}
          className="lg:col-span-5 relative"
        >
          {/* Glowing Amber Halo Accent Behind the Card */}
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-gold/15 rounded-full blur-[70px] pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-sky-500/10 rounded-full blur-[70px] pointer-events-none" />

          <div className="hud-card rounded-2xl p-6 sm:p-7 relative z-10 border border-white/[0.12]">
            {/* Card Header — Telemetry Bar */}
            <div className="flex items-center justify-between pb-5 border-b border-white/[0.08] mb-5">
              <div className="flex items-center gap-2">
                <Cpu size={15} className="text-gold" />
                <span className="font-mono text-xs text-white/80 tracking-widest uppercase">
                  AGENT_TELEMETRY//ACTIVE
                </span>
              </div>
              {/* Segmented Signal Meter (Language Explorer Style) */}
              <div className="flex items-center gap-1" title="Signal Integrity: 100%">
                {[...Array(6)].map((_, i) => (
                  <span
                    key={i}
                    className={`w-1.5 h-3 rounded-xs ${
                      i < 5 ? 'bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.6)]' : 'bg-sky-400/30'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Agent Selectors */}
            <div className="grid grid-cols-3 gap-2 mb-6 p-1 bg-white/[0.03] rounded-xl border border-white/[0.06]">
              <button
                type="button"
                onClick={() => handleAgentSelect('gravity')}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  activeAgent === 'gravity'
                    ? 'bg-gold/15 text-gold border border-gold/30 shadow-[0_0_15px_rgba(245,166,35,0.2)]'
                    : 'text-muted hover:text-white'
                }`}
              >
                <Activity size={13} />
                <span>GRAVITY</span>
              </button>

              <button
                type="button"
                onClick={() => handleAgentSelect('orbit')}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  activeAgent === 'orbit'
                    ? 'bg-[#A78BFA]/15 text-[#A78BFA] border border-[#A78BFA]/30 shadow-[0_0_15px_rgba(167,139,250,0.2)]'
                    : 'text-muted hover:text-white'
                }`}
              >
                <OrbitIcon size={13} />
                <span>ORBIT</span>
              </button>

              <button
                type="button"
                onClick={() => handleAgentSelect('pulsar')}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  activeAgent === 'pulsar'
                    ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30 shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                    : 'text-muted hover:text-white'
                }`}
              >
                <Zap size={13} />
                <span>PULSAR</span>
              </button>
            </div>

            {/* Live Readout Content */}
            <div className="space-y-3.5 mb-6">
              {activeAgent === 'gravity' ? (
                <>
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0 animate-ping" />
                    <div>
                      <div className="font-mono text-[11px] text-gold/90 font-medium mb-0.5">BRAND DNA INGESTION</div>
                      <p className="text-[13px] text-ink-2 leading-snug">
                        Synthesized 12 brand voice rules, tonal boundaries &amp; founder perspective.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                    <div>
                      <div className="font-mono text-[11px] text-emerald-400 font-medium mb-0.5">RIVAL SURVEILLANCE RADAR</div>
                      <p className="text-[13px] text-ink-2 leading-snug">
                        Tracking 4 direct competitors. 3 high-contrast counter-narratives staged.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 flex-shrink-0" />
                    <div>
                      <div className="font-mono text-[11px] text-sky-400 font-medium mb-0.5">OMNICHANNEL PIPELINE</div>
                      <p className="text-[13px] text-ink-2 leading-snug">
                        18 posts primed across LinkedIn, X &amp; Instagram. Tap approve to publish.
                      </p>
                    </div>
                  </div>
                </>
              ) : activeAgent === 'orbit' ? (
                <>
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA] mt-1.5 flex-shrink-0 animate-ping" />
                    <div>
                      <div className="font-mono text-[11px] text-[#A78BFA] font-medium mb-0.5">LEAD SOURCING SWEEP</div>
                      <p className="text-[13px] text-ink-2 leading-snug">
                        Found 18 businesses matching ICP. Maps + a second source, deduplicated.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                    <div>
                      <div className="font-mono text-[11px] text-emerald-400 font-medium mb-0.5">QUALIFICATION FILTER</div>
                      <p className="text-[13px] text-ink-2 leading-snug">
                        Phone-reachable, rated 4.2+. Enriched with verified contact emails.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                    <div>
                      <div className="font-mono text-[11px] text-gold/90 font-medium mb-0.5">CRM HANDOFF</div>
                      <p className="text-[13px] text-ink-2 leading-snug">
                        6 qualified leads pushed to CRM, assigned round-robin to reps.
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 flex-shrink-0 animate-ping" />
                    <div>
                      <div className="font-mono text-[11px] text-sky-400 font-medium mb-0.5">WHATSAPP INBOUND REFLEX</div>
                      <p className="text-[13px] text-ink-2 leading-snug">
                        Sub-second response time. Catalog inquiries converted into qualified demos.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                    <div>
                      <div className="font-mono text-[11px] text-emerald-400 font-medium mb-0.5">VOICE &amp; BROADCAST DISPATCH</div>
                      <p className="text-[13px] text-ink-2 leading-snug">
                        Personalized audio notes &amp; multi-segment re-engagement dispatched.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                    <div>
                      <div className="font-mono text-[11px] text-gold/90 font-medium mb-0.5">CRM SYNC</div>
                      <p className="text-[13px] text-ink-2 leading-snug">
                        Hot leads synced to Slack &amp; Google Sheets with full chat summaries.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Live Metrics Grid */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/[0.08] text-center font-mono">
              <div className="p-2 rounded-lg bg-white/[0.02]">
                <div className="text-[10px] text-muted">LATENCY</div>
                <div className="text-sm font-semibold text-white"><StatCounter value={14} suffix="ms" /></div>
              </div>
              <div className="p-2 rounded-lg bg-white/[0.02]">
                <div className="text-[10px] text-muted">CONFIDENCE</div>
                <div className="text-sm font-semibold text-emerald-400"><StatCounter value={99.4} decimals={1} suffix="%" /></div>
              </div>
              <div className="p-2 rounded-lg bg-white/[0.02]">
                <div className="text-[10px] text-muted">AUTOMATION</div>
                <div className="text-sm font-semibold text-gold">24/7</div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
