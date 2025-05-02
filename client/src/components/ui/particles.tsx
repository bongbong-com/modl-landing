import { useCallback, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  refresh?: boolean;
}

interface ParticleProps {
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
}

export function Particles({
  className = "",
  quantity = 30,
  staticity = 50,
  ease = 50,
  refresh = false,
}: ParticlesProps) {
  const [particles, setParticles] = useState<ParticleProps[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  // Colors for particles
  const colors = [
    "rgba(139, 92, 246, 0.5)", // Primary (purple)
    "rgba(59, 130, 246, 0.5)",  // Accent (blue)
    "rgba(16, 185, 129, 0.5)",  // Green
  ];

  const generateParticles = useCallback(() => {
    if (typeof window === "undefined") return [];
    
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    setDimensions({ width: newWidth, height: newHeight });
    
    return Array.from({ length: quantity }, (_, i) => ({
      x: Math.random() * newWidth,
      y: Math.random() * newHeight,
      size: Math.random() * 5 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 2,
      duration: Math.random() * 10 + 10,
    }));
  }, [quantity]);

  useEffect(() => {
    setParticles(generateParticles());
    
    const handleResize = () => {
      setParticles(generateParticles());
    };
    
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [generateParticles, refresh]);

  return (
    <div className={`fixed inset-0 overflow-hidden ${className}`}>
      {particles.map((particle, i) => (
        <Particle key={i} {...particle} staticity={staticity} ease={ease} />
      ))}
    </div>
  );
}

function Particle({
  x,
  y,
  size,
  color,
  delay,
  duration,
  staticity,
  ease,
}: ParticleProps & { staticity: number; ease: number }) {
  const controls = useAnimation();

  useEffect(() => {
    let isMounted = true;

    const animate = async () => {
      while (isMounted) {
        const randomX = x + (Math.random() - 0.5) * staticity;
        const randomY = y + (Math.random() - 0.5) * staticity;

        await controls.start({
          x: randomX,
          y: randomY,
          transition: { duration: duration / ease, ease: "easeInOut", delay },
        });
      }
    };

    animate();

    return () => {
      isMounted = false; // tried to fix error but idk if theres a better way
    };
  }, [x, y, controls, delay, duration, ease, staticity]);

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      animate={controls}
      initial={{ x, y, opacity: 0 }}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        boxShadow: `0 0 ${size}px ${color}`,
      }}
      transition={{ opacity: { duration: 0.3, ease: "easeInOut" } }}
      whileInView={{ opacity: 1 }}
    />
  );
}
