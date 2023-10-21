import { useFBX, PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { Canvas, useFrame } from "@react-three/fiber"
import { useRef } from 'react'
import * as THREE from "three"
import { OrbitControls as OrbitControlImpl } from "three-stdlib"
import { useControls } from "leva"

const View: React.FC = () => {
  const fbx = useFBX("/models/mofu.fbx")
  const controlRef = useRef<OrbitControlImpl>({} as OrbitControlImpl)
  const model = useRef({} as THREE.Mesh)

  console.log(fbx)
  const { animate, frequency, depth } = useControls("animation", {
    animate: true,
    frequency: { value: 5, min: 0, max: 10, step: 0.1 },
    depth: { value: 0.5, min: 0, max: 10, step: 0.1 },
  })
  const { ambIntensity, ambColor } = useControls("ambientLight", {
    ambIntensity: { value: 0.5, min: 0, max: 1, step: 0.1 },
    ambColor: { value: "#fff", label: "color" },
  })
  const { dirIntensity, dirColor } = useControls("dirientLight", {
    dirIntensity: { value: 0.4, min: 0, max: 1, step: 0.1 },
    dirColor: { value: "#fff", label: "color" },
  })

  useFrame(({ clock }) => {
    if (animate)
      model.current.position.y =
        Math.sin(clock.getElapsedTime() * frequency) * depth
  })

  return (
    <>
      <PerspectiveCamera
        makeDefault
        args={[35, innerWidth / innerHeight, 0.1, 2000]}
        position={[0, 0, 5]}
      />
      <ambientLight
        color={new THREE.Color(ambColor)}
        intensity={ambIntensity}
      />
      <directionalLight
        color={new THREE.Color(dirColor)}
        intensity={dirIntensity}
        position={[1, 0.55, 5]}
      />
      <mesh>
        <primitive object={fbx} ref={model} />
      </mesh>
      <OrbitControls makeDefault ref={controlRef} />
    </>
  )
}

function App() {
  return (
    <main>
      <h1>Three.js</h1>
      <Canvas
        style={{
          height: innerHeight,
          width: innerWidth,
        }}
      >
        <View />
      </Canvas>
    </main>
  )
}

export default App
