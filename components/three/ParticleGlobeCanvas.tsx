'use client'

import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { soundEngine } from '@/lib/soundEngine'
import { Plus, Minus, RotateCcw } from 'lucide-react'

interface Props {
  className?: string
  interactive?: boolean
}

export default function ParticleGlobeCanvas({ className = '', interactive = true }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [displayZoom, setDisplayZoom] = useState<number>(4.8)
  const targetZoomRef = useRef<number>(4.8)
  const isIntroCompleteRef = useRef<boolean>(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene, Camera, Renderer
    const scene = new THREE.Scene()
    const width = container.clientWidth || window.innerWidth
    const height = container.clientHeight || window.innerHeight

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    // INTRO: Start super zoomed in (Language Explorer style)
    camera.position.z = 1.3
    camera.position.y = 0.2

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    container.appendChild(renderer.domElement)

    // ─── Create 3D Particle Constellation (Sphere + Orbitals + Core) ───
    // Phones get a sparser field: the design direction calls for fewer
    // decorative particles on mobile, and 3,200 points is real work for a
    // mid-range phone GPU on a page that is mostly text.
    const PARTICLE_COUNT = width < 768 ? 1400 : 3200
    /** Three quarters of the field is the sphere; the rest forms the outer rings. */
    const SPHERE_COUNT = Math.floor(PARTICLE_COUNT * 0.75)
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const basePositions = new Float32Array(PARTICLE_COUNT * 3)
    const colors = new Float32Array(PARTICLE_COUNT * 3)
    const sizes = new Float32Array(PARTICLE_COUNT)
    const phases = new Float32Array(PARTICLE_COUNT)

    // One palette only — brand amber, a paler amber and a cool near-white.
    // Cyan and indigo used to live here; they read as a second and third
    // brand, which is exactly the "generic AI futuristic" look the design
    // direction rules out. Depth now comes from value, not from extra hues.
    const goldColor = new THREE.Color(0xf5a623)
    const paleGold = new THREE.Color(0xffe1ac)
    const coolWhite = new THREE.Color(0xdfe4ee)
    const dimGold = new THREE.Color(0x8a5406)

    // Generate Fibonacci Sphere with orbital rings
    const phi = Math.PI * (3 - Math.sqrt(5)) // golden angle

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      let x = 0, y = 0, z = 0
      let c = goldColor

      if (i < SPHERE_COUNT) {
        // Main planetary sphere
        const yCoord = 1 - (i / (SPHERE_COUNT - 1)) * 2 // -1 to 1
        const radiusAtY = Math.sqrt(1 - yCoord * yCoord)
        const theta = phi * i

        const r = 1.85 + (Math.random() - 0.5) * 0.08
        x = Math.cos(theta) * radiusAtY * r
        y = yCoord * r
        z = Math.sin(theta) * radiusAtY * r

        // Warm and lit at the equator, cooling toward the poles — the globe
        // reads as lit from its middle rather than as two different objects.
        const latNorm = Math.abs(yCoord)
        c = latNorm < 0.45 ? (Math.random() > 0.3 ? goldColor : paleGold) : (Math.random() > 0.55 ? coolWhite : dimGold)
      } else {
        // Outer celestial accretion rings & orbital halos
        const angle = Math.random() * Math.PI * 2
        const ringRadius = 2.3 + Math.random() * 0.7
        const tilt = 0.35

        x = Math.cos(angle) * ringRadius
        y = Math.sin(angle) * ringRadius * tilt + (Math.random() - 0.5) * 0.15
        z = Math.sin(angle) * ringRadius * Math.cos(tilt)

        c = Math.random() > 0.4 ? goldColor : dimGold
      }

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      basePositions[i * 3] = x
      basePositions[i * 3 + 1] = y
      basePositions[i * 3 + 2] = z

      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b

      sizes[i] = (Math.random() * 2.2 + 1.2) * (window.devicePixelRatio || 1)
      phases[i] = Math.random() * Math.PI * 2
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    // Particle Shader / Material
    // Create a circular glowing sprite texture procedurally
    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 64
    const ctx = canvas.getContext('2d')!
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)')
    grad.addColorStop(0.3, 'rgba(255, 230, 180, 0.8)')
    grad.addColorStop(0.7, 'rgba(245, 166, 35, 0.25)')
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 64, 64)

    const particleTexture = new THREE.CanvasTexture(canvas)

    const material = new THREE.PointsMaterial({
      size: 0.052,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const pointCloud = new THREE.Points(geometry, material)
    scene.add(pointCloud)

    // ─── Interaction & Dragging ───
    let isDragging = false
    let prevMouseX = 0
    let prevMouseY = 0
    let targetRotationX = 0.15
    let targetRotationY = 0
    const targetCameraZ = 4.8
    targetZoomRef.current = targetCameraZ

    const handlePointerDown = (e: PointerEvent) => {
      if (!interactive) return
      isDragging = true
      prevMouseX = e.clientX
      prevMouseY = e.clientY
      soundEngine.playHudHover()
    }

    const handlePointerMove = (e: PointerEvent) => {
      if (!interactive) return
      if (isDragging) {
        const deltaX = e.clientX - prevMouseX
        const deltaY = e.clientY - prevMouseY
        targetRotationY += deltaX * 0.005
        targetRotationX += deltaY * 0.005
        prevMouseX = e.clientX
        prevMouseY = e.clientY
      } else {
        // Subtle Parallax
        const rect = container.getBoundingClientRect()
        const normX = (e.clientX - rect.left) / rect.width - 0.5
        const normY = (e.clientY - rect.top) / rect.height - 0.5
        targetRotationY += (normX * 0.3 - pointCloud.rotation.y) * 0.02
        targetRotationX += (normY * 0.2 - pointCloud.rotation.x) * 0.02
      }
    }

    const handlePointerUp = () => {
      isDragging = false
    }

    container.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)

    // ─── Resize ───
    const handleResize = () => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    // ─── Animation Loop (Camera Choreography & Particle Swarm) ───
    let animId: number
    const clock = new THREE.Clock()
    const startTime = performance.now()

    const animate = () => {
      animId = requestAnimationFrame(animate)

      const elapsed = clock.getElapsedTime()
      const now = performance.now()
      const introProgress = Math.min((now - startTime) / 2400, 1.0)

      // CINEMATIC INTRO: Exponential ease-out zoom out from 1.3 to target
      if (!isIntroCompleteRef.current) {
        const ease = 1 - Math.pow(1 - introProgress, 3.5)
        camera.position.z = 1.3 + (targetZoomRef.current - 1.3) * ease
        if (introProgress >= 1.0) {
          isIntroCompleteRef.current = true
        }
      } else {
        // Smooth lerp to target zoom
        camera.position.z += (targetZoomRef.current - camera.position.z) * 0.08
      }

      // Smooth rotation with inertia
      pointCloud.rotation.y += (targetRotationY - pointCloud.rotation.y) * 0.05 + 0.0018
      pointCloud.rotation.x += (targetRotationX - pointCloud.rotation.x) * 0.05

      // Dynamic Particle Swarm Breathing (KPIT-style morphing frequency)
      const posAttr = geometry.attributes.position as THREE.BufferAttribute
      const posArray = posAttr.array as Float32Array

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3
        const bx = basePositions[i3]
        const by = basePositions[i3 + 1]
        const bz = basePositions[i3 + 2]
        const phase = phases[i]

        // Harmonious wave deformation
        const wave = Math.sin(elapsed * 1.5 + phase) * 0.035
        const morph = 1 + wave

        posArray[i3] = bx * morph
        posArray[i3 + 1] = by * morph
        posArray[i3 + 2] = bz * morph
      }
      posAttr.needsUpdate = true

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
      container.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
      geometry.dispose()
      material.dispose()
      particleTexture.dispose()
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [interactive])

  // HUD Zoom Controls
  const handleZoomIn = () => {
    soundEngine.playHudHover()
    const next = Math.max(2.4, targetZoomRef.current - 0.7)
    targetZoomRef.current = next
    setDisplayZoom(next)
  }

  const handleZoomOut = () => {
    soundEngine.playHudHover()
    const next = Math.min(7.0, targetZoomRef.current + 0.7)
    targetZoomRef.current = next
    setDisplayZoom(next)
  }

  const handleReset = () => {
    soundEngine.playHudActivate()
    targetZoomRef.current = 4.8
    setDisplayZoom(4.8)
  }

  return (
    <div className={`relative w-full h-full select-none cursor-grab active:cursor-grabbing ${className}`}>
      {/* WebGL 3D Canvas Mount Point */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full" />

      {/* Sci-Fi HUD Control Deck (Bottom Corner, Language Explorer style) */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
        {/* Telemetry Indicator */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/[0.08] backdrop-blur-md text-[11px] font-mono text-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>NEBULAA//CORE_ONLINE</span>
          <span className="text-white/20">|</span>
          <span className="tabular-nums text-white/70">Z: {displayZoom.toFixed(1)}</span>
        </div>

        {/* Zoom Controls HUD Pill */}
        <div className="flex items-center bg-black/75 border border-white/[0.12] rounded-full p-1 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          <button
            type="button"
            onClick={handleZoomIn}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/[0.08] transition"
            title="Zoom In (Magnify Constellation)"
            aria-label="Zoom in"
          >
            <Plus size={14} />
          </button>
          <div className="w-[1px] h-3.5 bg-white/[0.12]" />
          <button
            type="button"
            onClick={handleZoomOut}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/[0.08] transition"
            title="Zoom Out (View Deep Space Orbit)"
            aria-label="Zoom out"
          >
            <Minus size={14} />
          </button>
          <div className="w-[1px] h-3.5 bg-white/[0.12]" />
          <button
            type="button"
            onClick={handleReset}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-gold hover:bg-white/[0.08] transition"
            title="Reset Perspective"
            aria-label="Reset perspective"
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </div>
    </div>
  )
}
