declare module "three-cad-viewer" {
    export class Display {
      constructor(container: HTMLElement, options?: any);
    }
  
    export class Viewer {
      constructor(display: Display, isPerspective: boolean, options?: any);
      loadStep(buffer: ArrayBuffer): void;
    }
  }
  