"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const wavePalette = [
  { offset: 0, amplitude: 70, frequency: 0.003, color: "rgba(201,162,39,0.8)", opacity: 0.45 },
  { offset: Math.PI / 2, amplitude: 90, frequency: 0.0026, color: "rgba(232,201,106,0.7)", opacity: 0.35 },
  { offset: Math.PI, amplitude: 60, frequency: 0.0034, color: "rgba(154,122,10,0.65)", opacity: 0.3 },
  { offset: (Math.PI * 3) / 2, amplitude: 80, frequency: 0.0022, color: "rgba(201,162,39,0.25)", opacity: 0.25 },
  { offset: Math.PI * 2, amplitude: 55, frequency: 0.004, color: "rgba(245,240,232,0.2)", opacity: 0.2 },
];

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      time += 0.008;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#0A0A0A");
      gradient.addColorStop(0.5, "#0F0F0F");
      gradient.addColorStop(1, "#0A0A0A");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      wavePalette.forEach((wave) => {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        for (let x = 0; x <= canvas.width; x += 2) {
          const y =
            canvas.height / 2 +
            Math.sin(x * wave.frequency + time + wave.offset) * wave.amplitude +
            Math.sin(x * 0.001 + time * 0.5 + wave.offset) * 20;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fillStyle = wave.color;
        ctx.globalAlpha = wave.opacity;
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-4 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.span
          variants={itemVariants}
          className="inline-block px-4 py-1.5 rounded-full border border-gold-mid/30 bg-gold-mid/10 text-gold-light text-xs uppercase tracking-widest mb-6"
        >
          Cape Town &middot; South Africa
        </motion.span>

        <motion.h1
          variants={itemVariants}
          className="font-display text-5xl md:text-7xl lg:text-8xl leading-tight mb-6"
        >
          Your Dream Home,
          <br />
          <span className="bg-gradient-to-r from-gold-light via-gold-mid to-gold-dark bg-clip-text text-transparent">
            Built to Perfection.
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-10"
        >
          Renovations, mobile homes, custom kitchens and more.
          <br />
          Top Notch Creations turns your vision into reality.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a
            href="#contact"
            className="group bg-gold-mid hover:bg-gold-light text-black font-medium px-8 py-3.5 rounded-lg transition-all inline-flex items-center gap-2"
          >
            Start Your Project
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#services"
            className="border border-gold-mid text-gold-light hover:bg-gold-mid/10 px-8 py-3.5 rounded-lg text-sm font-medium transition-all"
          >
            Our Services
          </a>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-8 md:gap-12 px-6 md:px-10 py-4 rounded-full bg-cream/90 backdrop-blur-md border border-gold-mid/20"
        >
          {[
            { value: "10+", label: "Years Experience" },
            { value: "500+", label: "Projects Completed" },
            { value: "Cape Town", label: "Based" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-gold-dark font-display text-lg md:text-xl font-semibold">
                {stat.value}
              </div>
              <div className="text-xs text-black/70">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
