'use client'

import { Canvas3D } from '@/libs/components/3d/Canvas3D'
import { Loading } from '@/libs/components/3d/Loading'
import { Earth3DModel } from '@/libs/components/3d/models/Earth'
import { isAccessedAtToday, saveAccessDate } from '@/libs/utils/localstorage'
import { Html } from '@react-three/drei'
import { Suspense, useEffect, useState } from 'react'

export function Background3D() {
  const [earthScale, setEarthScale] = useState(0.0)

  const [isLoaded, setIsLoaded] = useState(false)
  const [isAccessed, setIsAccessed] = useState(false)
  // const [isAccessed] = useState(false) // デバッグ用

  const onLoaded = () => {
    // setTimeout(() => setIsLoaded(true), 10000) // デバッグ用
    setIsLoaded(true)
    saveAccessDate()
  }

  useEffect(() => {
    if (isLoaded) {
      setTimeout(() => {
        setEarthScale((current) => {
          const scale = current + 0.001
          return scale < 0.3 ? scale : 0.3
        })
      }, 10)
    }
  }, [isLoaded, earthScale])

  useEffect(() => {
    setIsAccessed(isAccessedAtToday())
    setEarthScale((current) => (isAccessed ? 0.3 : current))
  }, [isAccessed])

  return (
    <Canvas3D camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 1] }}>
      {!isAccessed && (
        <Html center>
          <Loading isLoaded={isLoaded} onLoaded={onLoaded} />
        </Html>
      )}
      <Suspense fallback={null}>
        <Earth3DModel scale={earthScale} />
      </Suspense>
    </Canvas3D>
  )
}
