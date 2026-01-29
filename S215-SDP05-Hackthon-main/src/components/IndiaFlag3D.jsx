// src/components/IndiaFlag3D.jsx
import React, { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Flag() {
  const flagRef = useRef();
  const texture = useLoader(THREE.TextureLoader, "/flag-india.jpg");

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const mesh = flagRef.current;

    if (mesh) {
      const geometry = mesh.geometry;
      const pos = geometry.attributes.position;
      const count = pos.count;

      // Wave parameters — tune until it looks natural
      const time = t * 1.25;
      const wind = 1.0; // wind strength
      const frequency1 = 2.2; // primary wave along X
      const amplitude1 = 0.12 * wind;
      const frequency2 = 1.1; // slower base wave
      const amplitude2 = 0.065 * wind;
      const rippleFreq = 12.0; // small ripples along Y
      const rippleAmp = 0.01;

      for (let i = 0; i < count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        // Primary wave along x plus some y ripple
        const z = Math.sin(x * frequency1 + time) * amplitude1
          + Math.sin(x * frequency2 + time * 0.9) * amplitude2
          + Math.sin(y * rippleFreq + time * 1.8) * rippleAmp;
        pos.setZ(i, z);
      }

      pos.needsUpdate = true;
      geometry.computeVertexNormals();
    }
  });

  return (
    <mesh ref={flagRef} rotation={[0, 0, 0]}>
      <planeGeometry args={[3.6, 2.1, 80, 80]} />
      <meshStandardMaterial
        map={texture}
        side={THREE.DoubleSide}
        roughness={0.75}
        metalness={0.02}
      />
    </mesh>
  );
}

export default function IndiaFlag3D() {
  return (
    <div className="w-full h-[400px]">
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={1} />
        <directionalLight position={[3, 3, 3]} />

        <Flag />

        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
