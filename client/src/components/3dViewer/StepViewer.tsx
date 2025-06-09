import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, ContactShadows } from '@react-three/drei'
import StepModel from './StepModel'
import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Loader } from './Loader'

function CameraLight() {
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

function FillLights() {
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

type Props = {
  url: string
}

export default function StepViewer({ url }: Props) {
  const [progress, setProgress] = useState(0)
  const [ready, setReady] = useState(false)


  // Reset on new URL
  useEffect(() => {
    setProgress(0)
    setReady(false)

    let current = 0
    const interval = setInterval(() => {
      current += Math.random() * 3 + 1
      if (current >= 100) {
        current = 100
        clearInterval(interval)
      }
      setProgress(Math.floor(current))
    }, 300)

    return () => clearInterval(interval)
  }, [url])



  return (
    <div className="relative w-full h-full min-h-[400px]  rounded-xl overflow-hidden shadow-2xl border bg-gray-600"
>

      {(!ready || progress < 100) && <Loader progress={progress} />}


    {progress === 100 && (
      
      <Canvas camera={{ position: [5, 5, 5], fov: 45 }}
       shadows
      
       >
        <CameraLight />
        <FillLights />
        {/* <Environment
          files={'/hdr/img.jpg'}
          background={false}
        /> */}
       
        <StepModel
          url={url}
          onLoad={() => setReady(true)}
        />
        <ContactShadows
          position={[0, -0.8, 0]}
          opacity={0.5}
          scale={10}
          blur={1.5}
          far={10}
        />
         <OrbitControls 
        makeDefault enableDamping dampingFactor={0.1}
      enabled={ready}
        />
      </Canvas>
            )}
    </div>
  )
}
