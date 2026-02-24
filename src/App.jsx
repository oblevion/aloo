import React, { Suspense } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber'; // <--- THE CRITICAL IMPORT
import { OrbitControls, Stars } from '@react-three/drei';

// Import your sub-components
import BlackHole from './components/BlackHole';
import DevNode from './components/DevNode';
import { teamData } from './data/team';

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
      <Canvas 
        camera={{ position: [0, 8, 20], fov: 45 }}
        gl={{ 
          antialias: true, 
          // This ensures the bright emissive colors in your GLB look "neon"
          toneMapping: THREE.NoToneMapping 
        }}
      >
        <color attach="background" args={['#010105']} />
        
        {/* Suspense is required when using useGLTF to load models */}
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[0, 0, 0]} intensity={150} color="#ffaa00" />

          <Stars radius={100} depth={50} count={10000} factor={6} fade speed={2} />
          
          <BlackHole />

          {teamData.map((person) => (
            <DevNode key={person.name} person={person} />
          ))}

          <OrbitControls autoRotate autoRotateSpeed={0.2} enablePan={false} />
        </Suspense>
      </Canvas>

      {/* HTML UI must stay OUTSIDE the Canvas */}
      <div className="hud">
        <h1>NEBULA_DEV_GROUP</h1>
        <p>SYSTEM_STATUS: STABLE // TOTAL_MEMBERS: 05</p>
      </div>
    </div>
  );
}