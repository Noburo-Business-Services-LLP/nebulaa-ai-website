'use client'

import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import * as THREE from 'three'

const BAR_COUNT = 40

function WaveBars() {
  const meshRefs = useRef<(THREE.Mesh | null)[]>([])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    meshRefs.current.forEach((mesh, i) => {
      if (mesh) {
        const scale = 0.2 + Math.abs(Math.sin(t * 3 + i * 0.3)) * 0.8
        mesh.scale.y = scale
        mesh.position.y = scale * 0.3
      }
    })
  })

  return (
    <>
      {Array.from({ length: BAR_COUNT }, (_, i) => {
        const x = (i - BAR_COUNT / 2) * 0.13
        return (
          <mesh
            key={i}
            ref={el => { meshRefs.current[i] = el }}
            position={[x, 0.3, 0]}
          >
            <boxGeometry args={[0.08, 0.6, 0.08]} />
            <meshStandardMaterial color="#F5B800" metalness={0.5} roughness={0.4} />
          </mesh>
        )
      })}
    </>
  )
}

export default function PulsarWave() {
  return (
    <div className="relative">
      <Canvas camera={{ position: [0, 0, 4], fov: 55 }} style={{ width: '100%', height: '280px', background: 'transparent' }} gl={{ alpha: true, antialias: true }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[3, 3, 3]} intensity={1} color="#FFF3B0" />
          <Environment preset="studio" />
          <WaveBars />
        </Suspense>
      </Canvas>
      {/* Overlay call info */}
      <div className="absolute inset-x-4 bottom-4 glass-card rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.92)', border: '1px solid rgba(232,228,220,0.8)', backdropFilter: 'blur(16px)' }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-body text-sm font-semibold text-brand-text">📞 Calling: Rahul S.</p>
            <p className="font-body text-xs text-brand-muted mt-0.5">Pre-qualifying... 00:42</p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
            <span className="font-body text-xs font-semibold text-brand-gold">LIVE</span>
          </div>
        </div>
      </div>
    </div>
  )
}
