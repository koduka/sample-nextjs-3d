import { Box } from "@/libs/components/Box";
import { Canvas3D } from "@/libs/components/Canvas3D";

export default function Home() {
  return (
    <Canvas3D>
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
