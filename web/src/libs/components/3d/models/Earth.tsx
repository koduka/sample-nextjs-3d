'use client'

import type { ThreeElements } from '@react-three/fiber'
import type * as THREE from 'three'

import { useGLTF } from '@/libs/useGLTF'
import { useAnimations } from '@react-three/drei'
import { motion } from 'framer-motion-3d'
import { useEffect, useRef } from 'react'

export function Earth3DModel(props: ThreeElements['group']) {
  const group = useRef<THREE.Group>(null!)
  const { nodes, materials, animations } = useGLTF('/models/earth.glb')
  const { actions, mixer } = useAnimations(animations, group)

  useEffect(() => {
    actions.spin?.play()
    mixer.addEventListener('loop', (e) => {
      // アニメーションがループされた時に発火
      console.log('loop', e)
    })
    mixer.addEventListener('finished', (e) => {
      // アニメーションが終了した時に発火
      console.log('finished', e)
    })
  }, [actions, mixer])

  return (
    <group ref={group} {...props}>
      <group name="Scene" dispose={null}>
        <motion.mesh
          name="earth"
          geometry={nodes.earth.geometry}
          material={materials.material}
          material-transparent={true}
          // material-opacity={1}
          material-animate={{
            opacity: [0, 1, 0], // 点滅のために透明度を1から0に変化させる
          }}
          material-transition={{
            duration: 1, // 1秒かけて点滅
            repeat: Infinity, // 永遠に繰り返す
            repeatType: 'reverse', // 透明度を1から0、そして0から1に戻す
          }}
        ></motion.mesh>
      </group>
    </group>
  )
}
