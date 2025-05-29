declare module 'three/examples/jsm/loaders/GLTFLoader.js' {
    import { Loader, LoadingManager } from 'three';
    import { Group } from 'three';
  
    export interface GLTF {
      animations: unknown[];
      scene: Group;
      scenes: Group[];
      cameras: unknown[];
      asset: unknown;
    }
  
    export class GLTFLoader extends Loader {
      constructor(manager?: LoadingManager);
      load(
        url: string,
        onLoad: (gltf: GLTF) => void,
        onProgress?: (event: ProgressEvent<EventTarget>) => void,
        onError?: (event: ErrorEvent | unknown) => void
      ): void;
      parse(
        data: ArrayBuffer | string,
        path: string,
        onLoad: (gltf: GLTF) => void,
        onError?: (event: ErrorEvent | unknown) => void
      ): void;
    }
  }
  