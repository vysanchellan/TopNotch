"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const HERO_IMAGE = "https://i.ibb.co/tpmzkpvP/Gemini-Generated-Image-arpsj2arpsj2arps.png";

export default function HeroSection() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${window.scrollY * 0.4}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: { x: number; y: number; size: number; speed: number; opacity: number; drift: number }[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.4 + 0.1,
        opacity: Math.random() * 0.5 + 0.1,
        drift: (Math.random() - 0.5) * 0.3,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 162, 39, ${p.opacity})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = "rgba(201,162,39,0.8)";
        ctx.fill();
        p.y -= p.speed;
        p.x += p.drift;
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden flex items-end pb-24 md:items-center md:pb-0">
      <div ref={parallaxRef} className="absolute inset-0 will-change-transform">
        <img
          src={HERO_IMAGE}
          alt="Luxury kitchen renovation by Top Notch Creations"
          className="hero-img w-full h-full object-cover object-center"
        />
      </div>

      <div className="absolute inset-0 z-[1] pointer-events-none" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.05) 100%)" }} />
      <div className="absolute inset-0 z-[2] pointer-events-none" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.6) 0%, transparent 60%)" }} />
      <canvas ref={particleCanvasRef} className="absolute inset-0 z-[3] pointer-events-none" aria-hidden="true" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] z-[4] pointer-events-none rounded-full" style={{ background: "radial-gradient(circle, rgba(201,162,39,0.08) 0%, transparent 70%)", filter: "blur(60px)" }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-32">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-2xl">
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 text-xs font-semibold uppercase tracking-[0.25em]"
            style={{ background: "rgba(201,162,39,0.12)", border: "1px solid rgba(201,162,39,0.3)", color: "#E8C96A" }}
          >
            CAPE TOWN &middot; SOUTH AFRICA
          </motion.div>

          <motion.h1 variants={itemVariants} className="font-display text-5xl md:text-7xl font-semibold text-white leading-[1.05] mb-6">
            Your Dream Home,<br />
            Built to{' '}
            <span className="shimmer-text">Perfection.</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg md:text-xl mb-10 max-w-lg" style={{ color: "rgba(255,255,255,0.7)" }}>
            Renovations, mobile homes, custom kitchens and more.
            Top Notch Creations turns your vision into reality.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-12">
            <a
              href="#contact"
              className="rounded-full px-8 py-3 text-sm font-semibold transition-all duration-300 hover:scale-105"
              style={{ background: "linear-gradient(135deg, #C9A227, #E8C96A)", color: "#0A0A0A", boxShadow: "0 8px 32px rgba(201,162,39,0.35)" }}
            >
              Start Your Project
            </a>
            <a
              href="#services"
              className="rounded-full px-8 py-3 text-sm font-semibold transition-all duration-300"
              style={{ border: "1px solid rgba(201,162,39,0.5)", color: "#E8C96A", background: "transparent" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(201,162,39,0.1)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              Our Services
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
            {["10+ Years Experience", "500+ Projects Completed", "Cape Town Based"].map((stat) => (
              <span
                key={stat}
                className="rounded-full px-5 py-2 text-sm"
                style={{ color: "rgba(255,255,255,0.75)", background: "rgba(255,255,255,0.06)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                {stat}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-xs tracking-[0.3em] uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>Scroll</span>
        <ChevronDown className="w-5 h-5 animate-bounce" style={{ color: "#C9A227" }} />
      </div>
    </section>
  );
}
