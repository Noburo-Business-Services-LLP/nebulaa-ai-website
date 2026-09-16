'use client'

import { useEffect, useRef } from 'react'

/**
 * The hero's signature visual: a field of dots in the same gold-on-ground
 * language as the static .neb-field motif (the "Gravity app thinking" dots
 * used elsewhere), but alive — drifting on its own, brightening and pulling
 * toward the cursor, breathing slightly with scroll.
 *
 * Deliberately not a 3D ground plane or shape-morphing field. Both are
 * bigger, riskier builds; this is the first pass — a field that reads as
 * "quietly working," which is what Nebulaa is actually about.
 *
 * Canvas + requestAnimationFrame, no new dependency. Reads --gold and
 * --particle-hot from CSS so it stays correct in both themes without
 * duplicating color logic here.
 */
export default function ParticleCanvas({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    interface Particle {
      x: number
      y: number
      baseX: number
      baseY: number
      phase: number
    }
    let particles: Particle[] = []

    const SPACING = 26
    const MAX_PARTICLES = 1400

    function readTokenColor(name: string, fallback: string) {
      const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
      return v || fallback
    }

    function buildField() {
      const rect = canvas!.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas!.width = width * dpr
      canvas!.height = height * dpr
      ctx!.scale(dpr, dpr)

      const cols = Math.min(Math.ceil(width / SPACING) + 1, 80)
      const rows = Math.min(Math.ceil(height / SPACING) + 1, 40)
      const next: Particle[] = []
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (next.length >= MAX_PARTICLES) break
          const x = c * SPACING + (r % 2 === 0 ? 0 : SPACING / 2)
          const y = r * SPACING
          next.push({ x, y, baseX: x, baseY: y, phase: Math.random() * Math.PI * 2 })
        }
      }
      particles = next
    }

    const mouse = { x: -9999, y: -9999, active: false }
    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.active = true
    }
    function onPointerLeave() {
      mouse.active = false
    }

    let visible = true
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting }, { threshold: 0 })
    io.observe(canvas)

    let raf = 0
    let t = 0
    const REPEL_RADIUS = 130

    function draw() {
      if (!ctx) return
      const base = readTokenColor('--particle', 'rgba(23,23,26,0.14)')
      const gold = readTokenColor('--gold', '#F5A623')

      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        // Slow ambient drift — a quiet field, not a busy one.
        const drift = reduceMotion ? 0 : Math.sin(t * 0.6 + p.phase) * 1.6
        let x = p.baseX
        let y = p.baseY + drift

        let brightness = 0
        if (mouse.active) {
          const dx = x - mouse.x
          const dy = y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < REPEL_RADIUS) {
            const force = (1 - dist / REPEL_RADIUS)
            const push = reduceMotion ? 0 : force * 10
            const angle = Math.atan2(dy, dx)
            x += Math.cos(angle) * push
            y += Math.sin(angle) * push
            brightness = force
          }
        }

        const radius = 1.1 + brightness * 1.1
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fillStyle = brightness > 0.04
          ? gold + Math.round(Math.min(brightness, 1) * 255).toString(16).padStart(2, '0')
          : base
        ctx.fill()
      }
    }

    function loop() {
      if (visible) {
        t += 0.016
        draw()
      }
      raf = requestAnimationFrame(loop)
    }

    buildField()
    draw()
    if (!reduceMotion) {
      raf = requestAnimationFrame(loop)
    }

    const ro = new ResizeObserver(() => { buildField(); draw() })
    ro.observe(canvas)

    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerleave', onPointerLeave)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className={`block w-full h-full ${className}`} />
}
