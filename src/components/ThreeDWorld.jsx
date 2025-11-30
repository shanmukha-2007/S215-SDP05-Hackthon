import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Sphere, Html } from "@react-three/drei";
import { useRef } from "react";
import articles from "../data/articles.json";

function Node({ position, label, color, index }) {
  const meshRef = useRef();

  // Static node – no interactive animation or hover scaling.
  return (
    <group position={position}>
      {/* Main Node Mesh (static) */}
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
      >
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.9}
          metalness={0.55}
          roughness={0.12}
        />
      </mesh>

      {/* Outer halo to increase color thickness (static) */}
      <mesh scale={1.4} position={[0, 0, 0]}> 
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.18}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <Html distanceFactor={8} position={[0, -0.45, 0]}>
        <div className="px-2 py-1 bg-white rounded shadow text-xs font-medium">
          {label}
        </div>
      </Html>
    </group>
  );
}

export default function ThreeDWorld() {
  const palette = [
    '#ef4444', // red
    '#f59e0b', // amber
    '#f97316', // orange
    '#10b981', // green
    '#06b6d4', // cyan
    '#3b82f6', // blue
    '#7c3aed', // purple
    '#ec4899', // pink
  ];

  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }} shadows dpr={[1, 2]}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 10]} intensity={1.2} castShadow />
      <pointLight position={[-10, -8, -8]} intensity={0.6} />

      {/* Central Sphere (static) */}
      <Sphere args={[2.2, 32, 32]}> 
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#0891b2"
          emissiveIntensity={0.25}
          transparent
          opacity={0.12}
        />
      </Sphere>

      {/* Outer glowing shell for central sphere (static) */}
      <Sphere args={[2.34, 32, 32]}> 
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.16}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      {/* Generate nodes around the sphere */}
      {articles.map((art, i) => {
        const angle = (i / articles.length) * Math.PI * 2;

        const color = palette[i % palette.length];
        return (
          <Node
            key={art.id}
            position={[Math.cos(angle) * 3, Math.sin(angle) * 2, 0]}
            label={art.title}
            color={color}
            index={i}
          />
        );
      })}
    </Canvas>
  );
}
