import { useEffect, useRef, useState } from 'react'
import { LoadStep } from './StepLoader'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'
import { OrbitControls as DreiOrbitControls } from 'three-stdlib' 


type Props = {
  url: string;
  onLoad?: (model: THREE.Object3D) => void;
}

export default function StepModel({ url, onLoad }: Props) {
  const [model, setModel] = useState<THREE.Object3D | null>(null)
  const groupRef = useRef<THREE.Group>(null)
  const { camera, controls } = useThree()

  useEffect(() => {
    const load = async () => {
      const object = await LoadStep(url)
     // Center the model
      const box = new THREE.Box3().setFromObject(object);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      object.position.sub(center);

      // Position the camera
      const maxDim = Math.max(size.x, size.y, size.z);
      const distance = maxDim * 1.5; // Slightly zoomed in
      camera.position.set(distance, distance, distance);
      camera.near = 0.1;
      camera.far = distance * 10;
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
     
        // Update OrbitControls target
        if (controls && (controls as DreiOrbitControls).target) {
          const orbit = controls as DreiOrbitControls
          orbit.target.set(0, 0, 0)
          orbit.update()
        }
      
        

      setModel(object)
      onLoad?.(object)
    }

   
    load()
  }, [url, camera, controls, onLoad])

  if (!model) return null

  return <group ref={groupRef}><primitive object={model} /></group>
}
