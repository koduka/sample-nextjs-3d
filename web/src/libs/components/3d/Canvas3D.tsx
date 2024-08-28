'use client'

import type { CanvasProps } from '@react-three/fiber'

import { Canvas } from '@react-three/fiber'

export function Canvas3D({ children, ...props }: CanvasProps) {
  return (
    <Canvas {...props}>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      {children}
    </Canvas>
  )
}
