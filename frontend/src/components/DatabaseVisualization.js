import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Box, Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';

const DatabaseNode = ({ position, color, label, size = 1 }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group position={position}>
      <Box ref={meshRef} args={[size, size, size]}>
        <meshStandardMaterial color={color} />
      </Box>
      <Text
        position={[0, size + 0.5, 0]}
        fontSize={0.3}
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
      lineWidth={2}
    />
  );
};

const DataFlow = ({ start, end }) => {
  const sphereRef = useRef();
  const progress = useRef(0);

  useFrame((state) => {
    progress.current = (Math.sin(state.clock.elapsedTime * 2) + 1) / 2;
    if (sphereRef.current) {
      const [sx, sy, sz] = start;
      const [ex, ey, ez] = end;
      sphereRef.current.position.x = sx + (ex - sx) * progress.current;
      sphereRef.current.position.y = sy + (ey - sy) * progress.current;
      sphereRef.current.position.z = sz + (ez - sz) * progress.current;
    }
  });

  return (
    <Sphere ref={sphereRef} args={[0.1]}>
      <meshStandardMaterial color="#67e8f9" emissive="#67e8f9" emissiveIntensity={0.5} />
    </Sphere>
  );
};

const DatabaseArchitecture = () => {
  const nodes = [
    { position: [0, 0, 0], color: "#1e3a8a", label: "Main DB", size: 1.5 },
    { position: [-3, 1, 0], color: "#22d3ee", label: "Cache", size: 1 },
    { position: [3, 1, 0], color: "#06b6d4", label: "Read Replica", size: 1 },
    { position: [0, -2, 0], color: "#67e8f9", label: "Analytics DB", size: 1 },
    { position: [-2, -1, 2], color: "#22d3ee", label: "Backup", size: 0.8 },
    { position: [2, -1, 2], color: "#06b6d4", label: "Archive", size: 0.8 },
  ];

  const connections = [
    { start: [0, 0, 0], end: [-3, 1, 0] },
    { start: [0, 0, 0], end: [3, 1, 0] },
    { start: [0, 0, 0], end: [0, -2, 0] },
    { start: [0, 0, 0], end: [-2, -1, 2] },
    { start: [0, 0, 0], end: [2, -1, 2] },
  ];

  const dataFlows = [
    { start: [0, 0, 0], end: [-3, 1, 0] },
    { start: [0, 0, 0], end: [3, 1, 0] },
    { start: [0, 0, 0], end: [0, -2, 0] },
  ];

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#22d3ee" />
      
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
        />
      ))}
      
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={0.5}
      />
    </>
  );
};

const DatabaseVisualization = () => {
  return (
    <div className="w-full h-96 bg-gradient-to-br from-gray-900 to-azellar-navy rounded-2xl overflow-hidden">
      <Canvas camera={{ position: [8, 5, 8], fov: 60 }}>
        <DatabaseArchitecture />
      </Canvas>
      
      <div className="absolute bottom-4 left-4 text-white">
        <p className="text-sm opacity-75">Interactive Database Architecture</p>
        <p className="text-xs opacity-50">Drag to rotate • Scroll to zoom</p>
      </div>
    </div>
  );
};

export default DatabaseVisualization;