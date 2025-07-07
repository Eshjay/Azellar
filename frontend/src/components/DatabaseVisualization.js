import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Box, Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../contexts/ThemeContext';

const DatabaseNode = ({ position, color, label, size = 1 }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group position={position}>
      <Box ref={meshRef} args={[size, size, size]}>
        <meshStandardMaterial color={color} />
      </Box>
      <Text
        position={[0, size + 0.5, 0]}
        fontSize={0.25}
        color="#1e3a8a"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
};

const ConnectionLine = ({ start, end }) => {
  const points = useMemo(() => [
    new THREE.Vector3(...start),
    new THREE.Vector3(...end)
  ], [start, end]);

  return (
    <Line
      points={points}
      color="#22d3ee"
      lineWidth={1}
    />
  );
};

const DataFlow = ({ start, end, speed = 1 }) => {
  const sphereRef = useRef();
  const progress = useRef(0);

  useFrame((state) => {
    if (sphereRef.current) {
      progress.current = (Math.sin(state.clock.elapsedTime * speed) + 1) / 2;
      const [sx, sy, sz] = start;
      const [ex, ey, ez] = end;
      sphereRef.current.position.x = sx + (ex - sx) * progress.current;
      sphereRef.current.position.y = sy + (ey - sy) * progress.current;
      sphereRef.current.position.z = sz + (ez - sz) * progress.current;
    }
  });

  return (
    <Sphere ref={sphereRef} args={[0.08]}>
      <meshStandardMaterial color="#67e8f9" emissive="#67e8f9" emissiveIntensity={0.3} />
    </Sphere>
  );
};

const DatabaseArchitecture = () => {
  const nodes = useMemo(() => [
    { position: [0, 0, 0], color: "#1e3a8a", label: "Main DB", size: 1.2 },
    { position: [-2.5, 1, 0], color: "#22d3ee", label: "Cache", size: 0.8 },
    { position: [2.5, 1, 0], color: "#06b6d4", label: "Replica", size: 0.8 },
    { position: [0, -1.5, 0], color: "#67e8f9", label: "Analytics", size: 0.8 },
    { position: [-1.5, -1, 1.5], color: "#22d3ee", label: "Backup", size: 0.6 },
    { position: [1.5, -1, 1.5], color: "#06b6d4", label: "Archive", size: 0.6 },
  ], []);

  const connections = useMemo(() => [
    { start: [0, 0, 0], end: [-2.5, 1, 0] },
    { start: [0, 0, 0], end: [2.5, 1, 0] },
    { start: [0, 0, 0], end: [0, -1.5, 0] },
    { start: [0, 0, 0], end: [-1.5, -1, 1.5] },
    { start: [0, 0, 0], end: [1.5, -1, 1.5] },
  ], []);

  const dataFlows = useMemo(() => [
    { start: [0, 0, 0], end: [-2.5, 1, 0], speed: 1.2 },
    { start: [0, 0, 0], end: [2.5, 1, 0], speed: 0.8 },
    { start: [0, 0, 0], end: [0, -1.5, 0], speed: 1.5 },
  ], []);

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, -5, -5]} intensity={0.3} color="#22d3ee" />
      
      {nodes.map((node, index) => (
        <DatabaseNode
          key={index}
          position={node.position}
          color={node.color}
          label={node.label}
          size={node.size}
        />
      ))}
      
      {connections.map((connection, index) => (
        <ConnectionLine
          key={index}
          start={connection.start}
          end={connection.end}
        />
      ))}
      
      {dataFlows.map((flow, index) => (
        <DataFlow
          key={index}
          start={flow.start}
          end={flow.end}
          speed={flow.speed}
        />
      ))}
      
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={0.3}
        maxDistance={12}
        minDistance={6}
      />
    </>
  );
};

const LoadingFallback = ({ isDark }) => (
  <div className={`w-full h-96 ${isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-900 to-azellar-navy'} rounded-2xl flex items-center justify-center`}>
    <div className="text-white text-center">
      <div className="animate-spin w-12 h-12 border-4 border-azellar-teal border-t-transparent rounded-full mx-auto mb-4"></div>
      <p className="text-sm opacity-75">Loading 3D Visualization...</p>
    </div>
  </div>
);

const DatabaseVisualization = () => {
  const { isDark } = useTheme();

  return (
    <div className={`w-full h-96 ${isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-900 to-azellar-navy'} rounded-2xl overflow-hidden relative`}>
      <Suspense fallback={<LoadingFallback isDark={isDark} />}>
        <Canvas 
          camera={{ position: [6, 4, 6], fov: 50 }}
          performance={{ min: 0.5 }}
          dpr={[1, 2]}
        >
          <DatabaseArchitecture />
        </Canvas>
      </Suspense>
      
      <div className="absolute bottom-4 left-4 text-white z-10">
        <p className="text-sm opacity-75">Interactive Database Architecture</p>
        <p className="text-xs opacity-50">Drag to rotate • Scroll to zoom</p>
      </div>
    </div>
  );
};

export default DatabaseVisualization;