import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

export default function HeroBackground() {
  return (
    <Canvas
      camera={{ position: [0, 0, 1] }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 0,
      }}
    >
      {/* Subtle star field */}
      <Stars
        radius={100}
        depth={50}
        count={3000}
        factor={4}
        fade
        speed={1}
      />
    </Canvas>
  );
}
