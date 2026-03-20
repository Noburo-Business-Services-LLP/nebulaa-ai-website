'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Html, Environment, Points, PointMaterial } from '@react-three/drei'
import { Suspense } from 'react'
import * as THREE from 'three'

function GoldTorusKnot() {
  const meshRef = useRef<THREE.Mesh>(null)
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15
      meshRef.current.rotation.y += delta * 0.12
    }
  })
  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1, 0.35, 128, 32]} />
      <meshStandardMaterial color="#F5B800" metalness={0.75} roughness={0.25} />
    </mesh>
  )
}

function Particles() {
  const count = 200
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 10
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return arr
  }, [])

  const pointsRef = useRef<THREE.Points>(null)
  useFrame((_, delta) => {
    if (pointsRef.current) pointsRef.current.rotation.y += delta * 0.05
  })

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial color="#F5B800" size={0.015} sizeAttenuation transparent opacity={0.4} />
    </Points>
  )
}

function FloatingCards() {
  return (
    <>
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8} position={[2.2, 1.2, 0]}>
        <Html center transform>
          <div className="glass-card rounded-xl p-3 text-xs font-body shadow-card w-40 pointer-events-none" style={{ background: 'rgba(255,255,255,0.92)', border: '1px solid rgba(232,228,220,0.8)', backdropFilter: 'blur(16px)' }}>
            <div className="flex items-center gap-2 mb-1.5">
              <span>🌀</span>
              <span className="font-semibold text-[#1A1815]">Gravity</span>
            </div>
            <p className="text-[#6B6560]">12 posts scheduled</p>
            <div className="mt-1.5 h-1 bg-[#F2F0EB] rounded-full overflow-hidden">
              <div className="h-full bg-[#F5B800] rounded-full" style={{ width: '75%' }} />
            </div>
          </div>
        </Html>
      </Float>

      <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.6} position={[-2.4, 0.2, 0.5]}>
        <Html center transform>
          <div className="rounded-xl p-3 text-xs font-body w-40 pointer-events-none" style={{ background: 'rgba(255,255,255,0.92)', border: '1px solid rgba(232,228,220,0.8)', backdropFilter: 'blur(16px)' }}>
            <div className="flex items-center gap-2 mb-1.5">
              <span>📞</span>
              <span className="font-semibold text-[#1A1815]">Pulsar</span>
            </div>
            <p className="text-[#6B6560]">3 calls in progress</p>
            <div className="flex gap-0.5 mt-1.5 items-end h-4">
              {[4,7,3,8,5,9,6,4,7,3].map((h, i) => (
                <div key={i} className="flex-1 rounded-sm" style={{ height: `${h * 4}px`, background: '#F5B800', opacity: 0.7 }} />
              ))}
            </div>
          </div>
        </Html>
      </Float>

      <Float speed={2.2} rotationIntensity={0.5} floatIntensity={1} position={[1.8, -1.6, 0.3]}>
        <Html center transform>
          <div className="rounded-xl p-3 text-xs font-body w-40 pointer-events-none" style={{ background: 'rgba(255,255,255,0.92)', border: '1px solid rgba(232,228,220,0.8)', backdropFilter: 'blur(16px)' }}>
            <div className="flex items-center gap-1.5">
              <span className="text-[#F5B800]">✓</span>
              <span className="font-semibold text-[#1A1815]">New lead qualified</span>
            </div>
            <p className="text-[#6B6560] mt-1">Arjun M. · B2B SaaS</p>
          </div>
        </Html>
      </Float>
    </>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#FFF3B0" />
      <Environment preset="city" />
      <GoldTorusKnot />
      <Particles />
      <FloatingCards />
    </>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  )
}
