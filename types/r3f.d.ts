declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      primitive: any;
      mesh: any;
      points: any;
      ambientLight: any;
      pointLight: any;
      directionalLight: any;
      spotLight: any;
      perspectiveCamera: any;
      orthographicCamera: any;
      color: any;
    }
  }
}

export {};
