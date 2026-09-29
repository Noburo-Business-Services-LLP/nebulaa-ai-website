/**
 * Interface sound is switched off: the warm, light redesign has no audio.
 * The API is kept as no-ops so existing call sites keep compiling; remove
 * them (and this file) as pages are touched.
 */
class SoundEngine {
  subscribe(cb: (enabled: boolean) => void) {
    cb(false)
    return () => {}
  }
  toggle() {
    return false
  }
  getSoundState() {
    return false
  }
  playHudHover() {}
  playClick() {}
  playHudActivate() {}
}

export const soundEngine = new SoundEngine()
