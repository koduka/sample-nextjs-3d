import { Canvas3D } from "@/libs/components/3d/Canvas3D";
import { Box } from "@/libs/components/3d/models/Box";

export default function Home() {
  return (
    <Canvas3D camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 1] }}>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <Box />
    </Canvas3D>
  );
}
