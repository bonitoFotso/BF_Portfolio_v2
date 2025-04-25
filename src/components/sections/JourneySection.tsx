import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import { MapPin, GraduationCap, Briefcase, Star } from 'lucide-react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { OrbitControls, Text } from '@react-three/drei';
import { cn } from '../../utils/cn';

// Journey locations data
const locations = [
  {
    id: 'iut',
    name: 'IUT Douala',
    type: 'education',
    coordinates: { lat: 4.0511, lng: 9.7679 },
    years: '2020-2023',
    description: {
      en: 'Bachelor\'s in Software Engineering',
      fr: 'Licence en Génie Logiciel'
    },
    achievements: [
      {
        en: 'Top of class in Software Development',
        fr: 'Premier de la promotion en Développement Logiciel'
      },
      {
        en: 'Led student programming club',
        fr: 'Dirigé le club de programmation des étudiants'
      }
    ]
  },
  {
    id: 'est',
    name: 'EST La SALLE',
    type: 'education',
    coordinates: { lat: 4.0464, lng: 9.7678 },
    years: '2020-2022',
    description: {
      en: 'HND in Industrial Computing',
      fr: 'BTS en Informatique Industrielle'
    },
    achievements: [
      {
        en: 'Specialized in Automation Systems',
        fr: 'Spécialisé en Systèmes d\'Automation'
      }
    ]
  },
  {
    id: 'kes',
    name: 'KES Africa',
    type: 'work',
    coordinates: { lat: 4.0494, lng: 9.7654 },
    years: '2024-Present',
    description: {
      en: 'Full-stack Developer',
      fr: 'Développeur Full-stack'
    },
    achievements: [
      {
        en: 'Developed QR code tracking system',
        fr: 'Développé un système de suivi par QR code'
      },
      {
        en: 'Implemented CI/CD pipelines',
        fr: 'Mis en place des pipelines CI/CD'
      }
    ]
  }
];

// 3D Map component
const CameroonMap = () => {
  const mesh = useRef();
  const [hovered, setHovered] = useState(null);
  
  // Load map texture
  const mapTexture = useLoader(
    TextureLoader,
    'https://images.pexels.com/photos/3183190/pexels-photo-3183190.jpeg'
  );
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.001;
    }
  });
  
  return (
    <group>
      <mesh
        ref={mesh}
        onPointerOver={(e) => setHovered(e.object)}
        onPointerOut={() => setHovered(null)}
      >
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial
          map={mapTexture}
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>
      
      {locations.map((location) => (
        <LocationMarker
          key={location.id}
          position={[
            location.coordinates.lng / 10,
            location.coordinates.lat / 10,
            0.1
          ]}
          location={location}
          isHovered={hovered?.userData?.id === location.id}
        />
      ))}
    </group>
  );
};

// Location marker component
const LocationMarker = ({ position, location, isHovered }) => {
  const { language } = useLanguage();
  
  return (
    <group position={position}>
      <mesh
        userData={{ id: location.id }}
        scale={isHovered ? 1.2 : 1}
      >
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshStandardMaterial
          color={location.type === 'education' ? '#3B82F6' : '#10B981'}
          emissive={isHovered ? '#ffffff' : '#000000'}
          emissiveIntensity={0.5}
        />
      </mesh>
      
      <Text
        position={[0.2, 0, 0]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="left"
        anchorY="middle"
      >
        {location.name}
      </Text>
    </group>
  );
};

const JourneySection = () => {
  const { t, language } = useLanguage();
  const sectionRef = useRef();
  const [activeLocation, setActiveLocation] = useState(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  
  return (
    <section
      id="journey"
      ref={sectionRef}
      className="h-screen bg-gray-900 relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          className="w-full h-full"
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 2}
          />
          <CameroonMap />
        </Canvas>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900" />
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        <motion.div
          style={{ y }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-white mb-8">
            {t('journey.title')}
          </h2>
          
          <div className="grid gap-8">
            {locations.map((location) => (
              <motion.div
                key={location.id}
                className={cn(
                  "bg-white/10 backdrop-blur-lg rounded-lg p-6",
                  "border border-white/20",
                  "hover:bg-white/20 transition-colors",
                  activeLocation === location.id && "bg-white/20"
                )}
                onMouseEnter={() => setActiveLocation(location.id)}
                onMouseLeave={() => setActiveLocation(null)}
              >
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "p-3 rounded-full",
                    location.type === 'education'
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-green-500/20 text-green-400"
                  )}>
                    {location.type === 'education' ? (
                      <GraduationCap size={24} />
                    ) : (
                      <Briefcase size={24} />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-white">
                        {location.name}
                      </h3>
                      <span className="text-sm text-gray-400">
                        {location.years}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 mb-4">
                      {location.description[language]}
                    </p>
                    
                    <div className="space-y-2">
                      {location.achievements.map((achievement, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-gray-400"
                        >
                          <Star size={16} className="text-yellow-500" />
                          <span>{achievement[language]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default JourneySection;