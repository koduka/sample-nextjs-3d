import type * as THREE from 'three'
import type { GLTF } from 'three-stdlib'

import { useGLTF as _useGLTF } from '@react-three/drei'

type Animation<ActionName = string> = THREE.AnimationClip & {
  name: ActionName
}

type UseGLTFResult = GLTF & {
  nodes: {
    [key in string]: THREE.Mesh
  }
  materials: {
    material: THREE.MeshStandardMaterial
  }
  animations: Animation[]
}

export function useGLTF(path: string) {
  return _useGLTF(path) as UseGLTFResult
}
