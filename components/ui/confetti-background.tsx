"use client";

import { useEffect, useRef } from 'react';

interface DustParticle {
  x: number; y: number;
  size: number; speed: number;
  opacity: number; drift: number;
}

export default function ConfettiBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 400 : 350;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const goldDust = [
      'rgba(201, 162, 39, 0.8)',
      'rgba(232, 201, 106, 0.7)',
      'rgba(154, 122, 10, 0.6)',
      'rgba(245, 240, 232, 0.5)',
      'rgba(201, 162, 39, 0.5)',
    ];

    const particles: DustParticle[] = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.8 + 0.3,
        speed: Math.random() * 0.5 + 0.15,
        opacity: Math.random() * 0.6 + 0.15,
        drift: (Math.random() - 0.5) * 0.4,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = goldDust[Math.floor(Math.random() * goldDust.length)];
        ctx.shadowBlur = 1.5;
        ctx.shadowColor = 'rgba(201,162,39,0.3)';
        ctx.fill();
        p.y -= p.speed;
        p.x += p.drift;
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
      });
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}
