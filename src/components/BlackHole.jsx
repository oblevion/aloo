import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Float } from '@react-three/drei';

export default function BlackHole() {
  // Load the model from the public folder
  // Replace '/black_hole.glb' with your actual filename
  const { scene } = useGLTF('/blackhole.glb'); 
  const modelRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (modelRef.current) {
      // Slow, majestic rotation
      modelRef.current.rotation.y = t * 0.1;
      // Gentle floating animation
      modelRef.current.position.y = Math.sin(t * 0.5) * 0.2;
    }
  });

  return (
    <group ref={modelRef}>
      {/* 1. The Imported 3D Model */}
      <primitive 
        object={scene} 
        scale={2.5} 
        rotation={[0, 0, Math.PI / 8]} 
      />

      {/* 2. Custom Point Light inside the model to make it glow from within */}
      <pointLight 
        intensity={200} 
        distance={20} 
        color="#ff8800" 
        decay={2} 
      />

      {/* 3. Optional: Add a simple invisible physics sphere for click detection */}
      <mesh visible={false}>
        <sphereGeometry args={[2, 32, 32]} />
      </mesh>
    </group>
  );
}

// Pre-load the model to prevent "popping" when the page loads
useGLTF.preload('/black_hole.glb');