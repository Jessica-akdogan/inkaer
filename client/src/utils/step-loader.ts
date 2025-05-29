import * as THREE from "three";
import occtModule from "occt-import-js";

function convertShapeToMesh(shape: any): THREE.Mesh {
  const geom = new THREE.BufferGeometry();
  geom.setAttribute("position", new THREE.Float32BufferAttribute(shape.positions, 3));
  if (shape.normals) {
    geom.setAttribute("normal", new THREE.Float32BufferAttribute(shape.normals, 3));
  }
  const color = new THREE.Color(...(shape.color || [0.7, 0.7, 0.7]));
  const material = new THREE.MeshStandardMaterial({ color });
  return new THREE.Mesh(geom, material);
}

export async function StepLoader(buffer: ArrayBuffer): Promise<THREE.Group> {
  const occt = await occtModule(); // ✅ no args
  const doc = occt.ReadStepFileFromArrayBuffer(buffer);
  const group = new THREE.Group();

  const shapes = occt.GetShapes(doc);
  for (const shape of shapes) {
    const mesh = convertShapeToMesh(shape);
    group.add(mesh);
  }

  return group;
}
