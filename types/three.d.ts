/// <reference types="@react-three/fiber" />

declare global {
  namespace JSX {
    interface IntrinsicElements {
      primitive: any;
      color: any;
      ambientLight: any;
      directionalLight: any;
      mesh?: any;
      sphereGeometry?: any;
      boxGeometry?: any;
      meshStandardMaterial?: any;
    }
  }
}

// Fix Canvas type for beta build
declare module '@react-three/fiber' {
  export const Canvas: any;
}

export {};
