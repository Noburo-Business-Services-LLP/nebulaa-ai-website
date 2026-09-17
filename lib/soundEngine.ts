/**
 * Native procedural Web Audio engine for Nebulaa.ai.
 * Synthesizes deep space ambient hum and tactile Sci-Fi HUD micro-interactions.
 * Zero external audio files required.
 */

class SoundEngine {
  private ctx: AudioContext | null = null
  private droneGain: GainNode | null = null
  private masterGain: GainNode | null = null
  private osc1: OscillatorNode | null = null
  private osc2: OscillatorNode | null = null
  private lfo: OscillatorNode | null = null
  // On by default — browsers block audio until a real user gesture, so the
  // engine starts armed and unlocks itself on the visitor's first click,
  // keypress or touch anywhere on the page. There is no way to play sound
  // before that gesture; that's a browser policy, not something we control.
  private isEnabled: boolean = true
  private hasUnlocked: boolean = false
  private listeners: Set<(enabled: boolean) => void> = new Set()

  private ensureContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioContextClass) {
        this.ctx = new AudioContextClass()
        this.masterGain = this.ctx.createGain()
        this.masterGain.gain.setValueAtTime(1.0, this.ctx.currentTime)
        this.masterGain.connect(this.ctx.destination)
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  public subscribe(cb: (enabled: boolean) => void) {
    this.listeners.add(cb)
    cb(this.isEnabled)
    this.armFirstGestureUnlock()
    return () => {
      this.listeners.delete(cb)
    }
  }

  /** Starts the ambient hum on the first click/keypress/touch, if still enabled. */
  private armFirstGestureUnlock() {
    if (this.hasUnlocked || typeof window === 'undefined') return
    this.hasUnlocked = true
    const unlock = () => {
      if (this.isEnabled) {
        this.ensureContext()
        this.startAmbient()
      }
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('keydown', unlock)
    }
    window.addEventListener('pointerdown', unlock, { once: true })
    window.addEventListener('keydown', unlock, { once: true })
  }

  private notify() {
    this.listeners.forEach(cb => cb(this.isEnabled))
  }

  public toggle(): boolean {
    if (this.isEnabled) {
      this.stopAmbient()
      this.isEnabled = false
    } else {
      this.ensureContext()
      this.startAmbient()
      this.isEnabled = true
      this.playHudActivate()
    }
    this.notify()
    return this.isEnabled
  }

  public getSoundState(): boolean {
    return this.isEnabled
  }

  private startAmbient() {
    if (!this.ctx || !this.masterGain) return

    try {
      this.stopAmbient()

      const now = this.ctx.currentTime

      // Lowpass filter for cosmic warmth
      const filter = this.ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(220, now)
      filter.Q.setValueAtTime(2.5, now)

      // Drone Gain
      this.droneGain = this.ctx.createGain()
      this.droneGain.gain.setValueAtTime(0.001, now)
      this.droneGain.gain.exponentialRampToValueAtTime(0.08, now + 2.0)

      // Oscillator 1 - Sub-bass fundamental (55 Hz - A1)
      this.osc1 = this.ctx.createOscillator()
      this.osc1.type = 'sine'
      this.osc1.frequency.setValueAtTime(55, now)

      // Oscillator 2 - Warm overtone (82.4 Hz - E2)
      this.osc2 = this.ctx.createOscillator()
      this.osc2.type = 'triangle'
      this.osc2.frequency.setValueAtTime(82.4, now)

      // LFO for slow atmospheric breathing (0.07 Hz)
      this.lfo = this.ctx.createOscillator()
      const lfoGain = this.ctx.createGain()
      this.lfo.frequency.setValueAtTime(0.07, now)
      lfoGain.gain.setValueAtTime(40, now)
      this.lfo.connect(lfoGain)
      lfoGain.connect(filter.frequency)

      // Wiring
      this.osc1.connect(filter)
      this.osc2.connect(filter)
      filter.connect(this.droneGain)
      this.droneGain.connect(this.masterGain)

      this.osc1.start(now)
      this.osc2.start(now)
      this.lfo.start(now)
    } catch {
      // Audio context error or user agent restriction
    }
  }

  private stopAmbient() {
    if (!this.ctx || !this.droneGain) return
    const now = this.ctx.currentTime
    try {
      this.droneGain.gain.setValueAtTime(this.droneGain.gain.value, now)
      this.droneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8)

      setTimeout(() => {
        try {
          this.osc1?.stop()
          this.osc2?.stop()
          this.lfo?.stop()
          this.osc1?.disconnect()
          this.osc2?.disconnect()
          this.lfo?.disconnect()
          this.droneGain?.disconnect()
        } catch {}
        this.osc1 = null
        this.osc2 = null
        this.lfo = null
        this.droneGain = null
      }, 900)
    } catch {
      this.osc1 = null
      this.osc2 = null
      this.lfo = null
      this.droneGain = null
    }
  }

  /**
   * Tactile HUD click / pulse on hovering buttons, tiles, or telemetry nodes
   */
  public playHudHover() {
    if (!this.isEnabled || !this.ctx || !this.masterGain) return
    try {
      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(1200, now)
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.02)

      gain.gain.setValueAtTime(0.03, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02)

      osc.connect(gain)
      gain.connect(this.masterGain)

      osc.start(now)
      osc.stop(now + 0.025)
    } catch {}
  }

  /**
   * Sharp mechanical click for an actual press — a button, a link, a toggle.
   * Distinct from playHudHover (a soft discovery tick on rollover): two
   * short detuned square-wave blips overlapped for a dry, relay-like snap
   * rather than a pure tone, closer to a keyboard switch than a beep.
   */
  public playClick() {
    if (!this.isEnabled || !this.ctx || !this.masterGain) return
    try {
      const now = this.ctx.currentTime

      const osc1 = this.ctx.createOscillator()
      const gain1 = this.ctx.createGain()
      osc1.type = 'square'
      osc1.frequency.setValueAtTime(2400, now)
      osc1.frequency.exponentialRampToValueAtTime(1100, now + 0.012)
      gain1.gain.setValueAtTime(0.025, now)
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.016)

      const osc2 = this.ctx.createOscillator()
      const gain2 = this.ctx.createGain()
      osc2.type = 'square'
      osc2.frequency.setValueAtTime(3100, now)
      osc2.frequency.exponentialRampToValueAtTime(1600, now + 0.01)
      gain2.gain.setValueAtTime(0.015, now)
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.013)

      osc1.connect(gain1)
      gain1.connect(this.masterGain)
      osc2.connect(gain2)
      gain2.connect(this.masterGain)

      osc1.start(now)
      osc1.stop(now + 0.018)
      osc2.start(now)
      osc2.stop(now + 0.015)
    } catch {}
  }

  /**
   * Confirmation chord when toggling sound or selecting an agent
   */
  public playHudActivate() {
    if (!this.ctx || !this.masterGain) return
    try {
      const now = this.ctx.currentTime
      const freqs = [440, 660, 880]

      freqs.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator()
        const gain = this.ctx!.createGain()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, now + idx * 0.03)

        gain.gain.setValueAtTime(0.04, now + idx * 0.03)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.03 + 0.15)

        osc.connect(gain)
        gain.connect(this.masterGain!)

        osc.start(now + idx * 0.03)
        osc.stop(now + idx * 0.03 + 0.16)
      })
    } catch {}
  }
}

export const soundEngine = new SoundEngine()
