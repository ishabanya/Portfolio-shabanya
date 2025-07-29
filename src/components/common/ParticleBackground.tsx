import { memo, useEffect, useRef, useCallback, useMemo } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

interface ParticleBackgroundProps {
  particleCount?: number;
  className?: string;
}

const ParticleBackground = memo<ParticleBackgroundProps>(({ 
  particleCount = 80,
  className = ""
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  const colors = useMemo(() => ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981'], []);

  const createParticles = useCallback((width: number, height: number): Particle[] => {
    return Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.6 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)] || '#3b82f6',
    }));
  }, [particleCount]);

  const drawParticle = useCallback((
    ctx: CanvasRenderingContext2D, 
    particle: Particle
  ) => {
    ctx.save();
    ctx.globalAlpha = particle.opacity;
    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }, []);

  const drawLine = useCallback((
    ctx: CanvasRenderingContext2D,
    p1: Particle,
    p2: Particle,
    distance: number
  ) => {
    const maxDistance = 100;
    const opacity = Math.max(0, (maxDistance - distance) / maxDistance) * 0.3;
    
    if (opacity > 0) {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
      ctx.restore();
    }
  }, []);

  const updateParticle = useCallback((
    particle: Particle,
    width: number,
    height: number,
    mouseX: number,
    mouseY: number
  ) => {
    // Mouse interaction
    const dx = mouseX - particle.x;
    const dy = mouseY - particle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = 100;

    if (distance < maxDistance) {
      const force = (maxDistance - distance) / maxDistance;
      particle.vx -= (dx / distance) * force * 0.01;
      particle.vy -= (dy / distance) * force * 0.01;
    }

    // Update position
    particle.x += particle.vx;
    particle.y += particle.vy;

    // Bounce off edges
    if (particle.x <= 0 || particle.x >= width) {
      particle.vx *= -0.8;
      particle.x = Math.max(0, Math.min(width, particle.x));
    }
    if (particle.y <= 0 || particle.y >= height) {
      particle.vy *= -0.8;
      particle.y = Math.max(0, Math.min(height, particle.y));
    }

    // Add some friction
    particle.vx *= 0.99;
    particle.vy *= 0.99;

    // Subtle opacity animation
    particle.opacity += Math.sin(Date.now() * 0.001 + particle.x * 0.01) * 0.005;
    particle.opacity = Math.max(0.1, Math.min(0.8, particle.opacity));
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    const particles = particlesRef.current;
    const { x: mouseX, y: mouseY } = mouseRef.current;

    // Update and draw particles
    particles.forEach(particle => {
      updateParticle(particle, width, height, mouseX, mouseY);
      drawParticle(ctx, particle);
    });

    // Draw connections between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];
        if (p1 && p2) {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            drawLine(ctx, p1, p2, distance);
          }
        }
      }
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [updateParticle, drawParticle, drawLine]);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { offsetWidth, offsetHeight } = canvas.parentElement!;
    canvas.width = offsetWidth;
    canvas.height = offsetHeight;

    // Recreate particles for new dimensions
    particlesRef.current = createParticles(offsetWidth, offsetHeight);
  }, [createParticles]);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initial setup
    handleResize();

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    // Event listeners
    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [animate, handleResize, handleMouseMove]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 1 }}
    />
  );
});

ParticleBackground.displayName = 'ParticleBackground';

export default ParticleBackground;