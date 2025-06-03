import {  useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import {  useRef } from 'react'

export function CameraLight() {
  const { camera } = useThree()
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.copy(camera.position)
      groupRef.current.quaternion.copy(camera.quaternion)
    }
  })

  return (
    <group ref={groupRef}>
      <directionalLight
        color={0xffffff}
        intensity={0.7}
        position={[0, 0, 1]}
      />
    </group>
  )
}

export function FillLights() {
  return (
    <>
      <ambientLight
       color={0xffffff}
      intensity={0.7} />
      <directionalLight 
      position={[5, 5, 5]}
       intensity={0.7} />
      <directionalLight 
       color={0xffffff}
      position={[-5, 5, 5]} 
      intensity={0.7} />
      <directionalLight 
      position={[5, -5, -5]} 
      intensity={0.7} />
      <directionalLight 
      position={[-5, -5, -5]} 
      intensity={0.8} />
      <spotLight color={0x00ff00} 
      position={[0, 5, 10]} 
      angle={0.15} 
      penumbra={1}
       intensity={1.5} />
       <pointLight color={0xffffff} 
       position={[-10, -10, -10]}
      intensity={0.8} />
    </>
  )
}