'use client'

import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshWobbleMaterial, Float, Html, Environment } from '@react-three/drei'
import * as THREE from 'three'

function Orb() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.3
      ref.current.rotation.x += delta * 0.1
    }
  })
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={ref}>
        <sphereGeometry args={[1.2, 64, 64]} />
        <MeshWobbleMaterial color="#F5B800" metalness={0.6} roughness={0.3} factor={0.3} speed={1.5} />
      </mesh>
    </Float>
  )
}

function OrbitingPlatforms() {
  const platforms = [
    { label: 'LinkedIn', color: '#0A66C2', angle: 0 },
    { label: 'Instagram', color: '#E1306C', angle: 2.1 },
    { label: 'Twitter', color: '#1DA1F2', angle: 4.2 },
  ]

  const groupRef = useRef<THREE.Group>(null)
  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.5
  })

  return (
    <group ref={groupRef}>
      {platforms.map((p, i) => {
        const x = Math.cos(p.angle) * 2.2
        const z = Math.sin(p.angle) * 2.2
        return (
          <Float key={i} speed={1.5 + i * 0.3} floatIntensity={0.4} position={[x, 0, z]}>
            <Html center transform>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold pointer-events-none" style={{ background: p.color, fontSize: '10px' }}>
                {p.label[0]}
              </div>
            </Html>
          </Float>
        )
      })}
    </group>
  )
}

export default function GravityOrb() {
  return (
    <Canvas camera={{ position: [0, 0, 4.5], fov: 55 }} style={{ width: '100%', height: '320px', background: 'transparent' }} gl={{ alpha: true, antialias: true }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[4, 4, 4]} intensity={1.2} color="#FFF3B0" />
        <Environment preset="studio" />
        <Orb />
        <OrbitingPlatforms />
      </Suspense>
    </Canvas>
  )
}
