import React from 'react';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

export default function DevNode({ person }) {
  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={2}>
      <group position={person.pos}>
        {/* The Core Sphere */}
        <mesh>
          <sphereGeometry args={[0.7, 32, 32]} />
          <meshStandardMaterial 
            color={person.color} 
            emissive={person.color}
            emissiveIntensity={10} 
            toneMapped={false}
          />
        </mesh>
        
        {/* The "Glow Aura" */}
        <mesh>
          <sphereGeometry args={[0.85, 32, 32]} />
          <meshBasicMaterial 
  color={person.color} 
  transparent 
  opacity={0.3} 
  blending={THREE.AdditiveBlending} // This makes colors "stack" and glow
/>
        </mesh>
        
        <Text
          position={[0, -1.3, 0]}
          fontSize={0.25}
          color="white"
          anchorX="center"
          // Font property removed to fix loading error
        >
          {`${person.name}\n${person.role}`}
        </Text>
      </group>
    </Float>
  );
}