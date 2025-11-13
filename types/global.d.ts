// fallback JSX types for react-three-fiber if package types missing
declare namespace JSX {
  interface IntrinsicElements {
    primitive: any
    color: any
    ambientLight: any
    directionalLight: any
    mesh: any
    sphereGeometry: any
    boxGeometry: any
    meshStandardMaterial: any
  }
}


