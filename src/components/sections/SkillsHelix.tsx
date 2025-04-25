import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Line } from '@react-three/drei';
import { cn } from '../../utils/cn';

// Skill categories with their respective colors
const skillCategories = {
  technical: {
    color: '#3B82F6', // blue
    skills: [
      { name: 'React', level: 5 },
      { name: 'TypeScript', level: 4 },
      { name: 'Node.js', level: 4 },
      { name: 'Flutter', level: 4 },
      { name: 'Django', level: 5 },
      { name: 'PostgreSQL', level: 4 }
    ]
  },
  soft: {
    color: '#10B981', // green
    skills: [
      { name: 'Problem Solving', level: 5 },
      { name: 'Communication', level: 4 },
      { name: 'Team Leadership', level: 4 },
      { name: 'Adaptability', level: 5 },
      { name: 'Time Management', level: 4 },
      { name: 'Creativity', level: 4 }
    ]
  }
};

// DNA Helix component
const DNAHelix = ({ rotation = 0, hoveredSkill }) => {
  const groupRef = useRef();
  
  useFrame((state) => {
    groupRef.current.rotation.y = rotation + state.clock.getElapsedTime() * 0.1;
  });
  
  // Generate helix points
  const points = Array.from({ length: 50 }, (_, i) => {
    const angle = (i / 50) * Math.PI * 4;
    const x = Math.cos(angle) * 2;
    const y = (i / 50) * 10 - 5;
    const z = Math.sin(angle) * 2;
    return [x, y, z];
  });
  
  return (
    <group ref={groupRef}>
      {/* First strand */}
      <Line
        points={points}
        color={skillCategories.technical.color}
        lineWidth={5}
      />
      
      {/* Second strand */}
      <Line
        points={points.map(([x, y, z]) => [-x, y, -z])}
        color={skillCategories.soft.color}
        lineWidth={5}
      />
      
      {/* Connecting bars */}
      {points.filter((_, i) => i % 4 === 0).map((point, i) => (
        <mesh key={i} position={point}>
          <boxGeometry args={[4, 0.1, 0.1]} />
          <meshStandardMaterial
            color={hoveredSkill ? '#ffffff' : '#666666'}
            opacity={0.5}
            transparent
          />
        </mesh>
      ))}
      
      {/* Skill labels */}
      {Object.entries(skillCategories).map(([category, { skills, color }]) => (
        skills.map((skill, i) => {
          const angle = (i / skills.length) * Math.PI * 2;
          const radius = category === 'technical' ? 3 : -3;
          const x = Math.cos(angle) * radius;
          const y = (i / skills.length) * 10 - 5;
          const z = Math.sin(angle) * radius;
          
          return (
            <group
              key={`${category}-${skill.name}`}
              position={[x, y, z]}
              lookAt={[0, y, 0]}
            >
              <Text
                color={hoveredSkill === skill.name ? '#ffffff' : color}
                fontSize={0.3}
                anchorX="center"
                anchorY="middle"
              >
                {skill.name}
              </Text>
            </group>
          );
        })
      ))}
    </group>
  );
};

const SkillsHelix = () => {
  const { t } = useLanguage();
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [rotation, setRotation] = useState(0);
  
  const containerRef = useRef();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  
  return (
    <section
      ref={containerRef}
      className="h-screen bg-gray-900 relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <DNAHelix rotation={rotation} hoveredSkill={hoveredSkill} />
        </Canvas>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900" />
      
      <motion.div
        style={{ y }}
        className="relative z-10 container mx-auto px-4 py-20"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-8">
            {t('skills.title')}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(skillCategories).map(([category, { skills, color }]) => (
              <div key={category}>
                <h3
                  className="text-2xl font-bold mb-6"
                  style={{ color }}
                >
                  {t(`skills.categories.${category}`)}
                </h3>
                
                <div className="space-y-4">
                  {skills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      className="bg-white/10 backdrop-blur-lg rounded-lg p-4"
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-medium">
                          {skill.name}
                        </span>
                        <span className="text-gray-400">
                          {skill.level}/5
                        </span>
                      </div>
                      
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            backgroundColor: color,
                            width: `${(skill.level / 5) * 100}%`
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${(skill.level / 5) * 100}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default SkillsHelix;