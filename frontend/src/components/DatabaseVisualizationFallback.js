import { motion } from 'framer-motion';
import { Database, Server, HardDrive, Shield } from 'lucide-react';

const DatabaseVisualizationFallback = () => {
  const nodes = [
    { id: 'main', icon: Database, label: 'Main Database', x: 50, y: 50, color: 'bg-azellar-navy' },
    { id: 'cache', icon: Server, label: 'Cache Layer', x: 20, y: 30, color: 'bg-azellar-teal' },
    { id: 'replica', icon: Database, label: 'Read Replica', x: 80, y: 30, color: 'bg-azellar-cyan' },
    { id: 'analytics', icon: HardDrive, label: 'Analytics DB', x: 50, y: 80, color: 'bg-azellar-aqua' },
    { id: 'backup', icon: Shield, label: 'Backup', x: 20, y: 70, color: 'bg-azellar-teal' },
    { id: 'archive', icon: HardDrive, label: 'Archive', x: 80, y: 70, color: 'bg-azellar-cyan' },
  ];

  const connections = [
    { from: { x: 50, y: 50 }, to: { x: 20, y: 30 } },
    { from: { x: 50, y: 50 }, to: { x: 80, y: 30 } },
    { from: { x: 50, y: 50 }, to: { x: 50, y: 80 } },
    { from: { x: 50, y: 50 }, to: { x: 20, y: 70 } },
    { from: { x: 50, y: 50 }, to: { x: 80, y: 70 } },
  ];

  return (
    <div className="w-full h-96 bg-gradient-to-br from-gray-900 to-azellar-navy rounded-2xl overflow-hidden relative">
      <div className="absolute inset-0 p-8">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Animated connections */}
          {connections.map((connection, index) => (
            <motion.line
              key={index}
              x1={connection.from.x}
              y1={connection.from.y}
              x2={connection.to.x}
              y2={connection.to.y}
              stroke="#22d3ee"
              strokeWidth="0.5"
              strokeDasharray="2,2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 1, delay: index * 0.2 }}
            />
          ))}

          {/* Animated data flow */}
          {connections.slice(0, 3).map((connection, index) => (
            <motion.circle
              key={`flow-${index}`}
              r="0.5"
              fill="#67e8f9"
              initial={{ 
                cx: connection.from.x, 
                cy: connection.from.y,
                opacity: 0 
              }}
              animate={{
                cx: [connection.from.x, connection.to.x],
                cy: [connection.from.y, connection.to.y],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </svg>

        {/* Database nodes */}
        {nodes.map((node, index) => (
          <motion.div
            key={node.id}
            className={`absolute w-16 h-16 ${node.color} rounded-xl flex items-center justify-center shadow-lg`}
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.1,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <node.icon className="w-8 h-8 text-white" />
          </motion.div>
        ))}

        {/* Labels */}
        {nodes.map((node, index) => (
          <motion.div
            key={`label-${node.id}`}
            className="absolute text-white text-xs font-medium text-center"
            style={{
              left: `${node.x}%`,
              top: `${node.y + 8}%`,
              transform: 'translateX(-50%)'
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: (index * 0.1) + 0.3 }}
          >
            {node.label}
          </motion.div>
        ))}
      </div>
      
      <div className="absolute bottom-4 left-4 text-white z-10">
        <p className="text-sm opacity-75">Database Architecture Overview</p>
        <p className="text-xs opacity-50">Simplified 2D visualization</p>
      </div>
    </div>
  );
};

export default DatabaseVisualizationFallback;