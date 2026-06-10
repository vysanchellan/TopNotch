"use client";

import { useEffect, useRef } from 'react';

interface ConfettiPiece {
  x: number; y: number; z: number;
  velocityX: number; velocityY: number; velocityZ: number;
  rotation: number; rotationSpeed: number;
  baseSize: number; opacity: number;
  shape: 'rectangle' | 'circle' | 'star' | 'diamond';
  color: string;
  floatPhase: number; swayAmplitude: number; bobAmplitude: number;
  fadeStart: number; isFading: boolean;
}

export default function ConfettiBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const confettiRef = useRef<ConfettiPiece[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 300 : 250;
    const sizeMultiplier = isMobile ? 1.4 : 1;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const goldColors = [
      'rgba(201, 162, 39, 0.9)',
      'rgba(232, 201, 106, 0.8)',
      'rgba(154, 122, 10, 0.75)',
      'rgba(245, 240, 232, 0.6)',
      'rgba(201, 162, 39, 0.6)',
    ];

    const initConfetti = () => {
      confettiRef.current = [];
      for (let i = 0; i < count; i++) {
        confettiRef.current.push({
          x: Math.random() * canvas.width,
          y: -Math.random() * canvas.height * 0.15,
          z: Math.random() * 800 + 400,
          velocityX: (Math.random() - 0.5) * 0.8,
          velocityY: Math.random() * 0.8 + 0.4,
          velocityZ: -(Math.random() * 1.2 + 0.6),
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.06,
          baseSize: (Math.random() * 12 + 6) * sizeMultiplier,
          opacity: 1,
          shape: (['rectangle', 'circle', 'star', 'diamond'] as const)[Math.floor(Math.random() * 4)],
          color: goldColors[Math.floor(Math.random() * goldColors.length)],
          floatPhase: Math.random() * Math.PI * 2,
          swayAmplitude: Math.random() * 0.5 + 0.2,
          bobAmplitude: Math.random() * 0.3 + 0.1,
          fadeStart: 0,
          isFading: false,
        });
      }
    };

    const drawConfetti = (piece: ConfettiPiece) => {
      const perspective = 800;
      const scale = perspective / (perspective + piece.z);
      const projectedX = piece.x + (piece.x - canvas.width / 2) * (1 - scale);
      const projectedY = piece.y + (piece.y - canvas.height / 2) * (1 - scale);
      if (scale <= 0.01 || scale > 2) return;
      const size = piece.baseSize * scale;
      const opacity = Math.min(piece.opacity * scale * 1.5, 1);

      ctx.save();
      ctx.translate(projectedX, projectedY);
      ctx.rotate(piece.rotation);
      ctx.globalAlpha = opacity;

      const shadowIntensity = Math.min(scale * 0.3, 0.2);
      ctx.shadowColor = `rgba(201, 162, 39, ${shadowIntensity * 0.5})`;
      ctx.shadowBlur = scale * 8;
      ctx.shadowOffsetX = scale * 2;
      ctx.shadowOffsetY = scale * 2;

      ctx.fillStyle = piece.color;

      switch (piece.shape) {
        case 'rectangle':
          ctx.fillRect(-size * 0.75, -size * 0.4, size * 1.5, size * 0.8);
          break;
        case 'circle':
          ctx.beginPath();
          ctx.arc(0, 0, size * 0.6, 0, Math.PI * 2);
          ctx.fill();
          break;
        case 'star': {
          ctx.beginPath();
          const ss = size * 0.7;
          for (let i = 0; i < 6; i++) {
            const a = (i * Math.PI) / 3;
            const x = Math.cos(a) * ss;
            const y = Math.sin(a) * ss;
            if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            const ia = ((i + 0.5) * Math.PI) / 3;
            ctx.lineTo(Math.cos(ia) * ss * 0.5, Math.sin(ia) * ss * 0.5);
          }
          ctx.closePath();
          ctx.fill();
          break;
        }
        case 'diamond': {
          ctx.beginPath();
          const ds = size * 0.8;
          ctx.moveTo(0, -ds);
          ctx.lineTo(ds * 0.6, 0);
          ctx.lineTo(0, ds);
          ctx.lineTo(-ds * 0.6, 0);
          ctx.closePath();
          ctx.fill();
          break;
        }
      }
      ctx.restore();
    };

    const updateConfetti = () => {
      confettiRef.current.forEach((piece) => {
        piece.floatPhase += 0.02;
        const swayX = Math.sin(piece.floatPhase) * piece.swayAmplitude * 0.3;
        const bobY = Math.cos(piece.floatPhase * 0.7) * piece.bobAmplitude * 0.2;
        piece.x += piece.velocityX + swayX;
        piece.y += piece.velocityY + bobY;
        piece.z += piece.velocityZ;
        piece.rotation += piece.rotationSpeed;
        const turbulence = Math.max(0, 1 - piece.z / 1500) * 0.08;
        piece.velocityX += (Math.random() - 0.5) * turbulence * 0.5;
        piece.velocityY += (Math.random() - 0.5) * turbulence * 0.5;
        piece.velocityX += (Math.random() - 0.5) * 0.005;
        piece.velocityY += (Math.random() - 0.5) * 0.005;
        piece.velocityX *= 0.999;
        piece.velocityY *= 0.999;
        piece.velocityY += 0.0005;
        piece.velocityZ *= 1.0005;
        if (!piece.isFading && (piece.z <= 200 || piece.x < -150 || piece.x > canvas.width + 150 || piece.y > canvas.height + 150)) {
          piece.isFading = true;
          piece.fadeStart = piece.opacity;
        }
        if (piece.isFading) piece.opacity -= 0.02;
        if (piece.opacity <= 0) {
          piece.x = Math.random() * canvas.width;
          piece.y = -Math.random() * canvas.height * 0.15;
          piece.z = Math.random() * 800 + 400;
          piece.velocityX = (Math.random() - 0.5) * 0.8;
          piece.velocityY = Math.random() * 0.8 + 0.4;
          piece.velocityZ = -(Math.random() * 1.2 + 0.6);
          piece.floatPhase = Math.random() * Math.PI * 2;
          piece.opacity = 1;
          piece.isFading = false;
          piece.fadeStart = 0;
        }
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const grad = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width * 0.7);
      grad.addColorStop(0, '#1A1A1A');
      grad.addColorStop(0.5, '#0F0F0F');
      grad.addColorStop(1, '#0A0A0A');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      updateConfetti();
      confettiRef.current.forEach(drawConfetti);
      animationRef.current = requestAnimationFrame(animate);
    };

    initConfetti();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}
