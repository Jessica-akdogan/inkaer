import * as THREE from 'three'
import occtimportjs from 'occt-import-js'

const wasmUrl = 'https://cdn.jsdelivr.net/npm/occt-import-js@0.0.12/dist/occt-import-js.wasm'

export async function LoadStep(fileUrl: string): Promise<THREE.Object3D> {
  const occt = await occtimportjs()
  occt.locateFile = () => wasmUrl

  const res = await fetch(fileUrl)
  const buffer = await res.arrayBuffer()
  const fileBuffer = new Uint8Array(buffer)
  const result = occt.ReadStepFile(fileBuffer)

  const group = new THREE.Object3D()

  for (const mesh of result.meshes) {
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(mesh.attributes.position.array, 3))
    if (mesh.attributes.normal) {
      geometry.setAttribute('normal', new THREE.Float32BufferAttribute(mesh.attributes.normal.array, 3))
    }
    const index = Uint16Array.from(mesh.index.array)
    geometry.setIndex(new THREE.BufferAttribute(index, 1))

    const color = mesh.color
      ? new THREE.Color(...mesh.color)
      : new THREE.Color(0xffffff)

    const material = new THREE.MeshStandardMaterial({
      color,
      metalness: 0.5,
      roughness: 0.5,
      side: THREE.DoubleSide,
    })

    group.add(new THREE.Mesh(geometry, material))
  }

  // Center and scale model
  const box = new THREE.Box3().setFromObject(group)
  const center = new THREE.Vector3()
  box.getCenter(center)
  group.position.sub(center) // Center the model

  const size = box.getSize(new THREE.Vector3()).length()
  const scale = 2 / size // Adjust scale factor to fit into view
  group.scale.setScalar(scale)

  return group
}
