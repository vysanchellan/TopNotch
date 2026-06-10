"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Maximize2, X } from "lucide-react";

const projects = [
  {
    src: "https://i.ibb.co/fzdTwHSY/69651878-397948610860110-164338037294104576-n.jpg",
    alt: "Kitchen renovation",
  },
  {
    src: "https://i.ibb.co/v4MCHM3c/118837587-619765352011767-8308457006625872218-n.jpg",
    alt: "Modern living room",
  },
  {
    src: "https://i.ibb.co/qLctcc2G/307637447-1072446033410361-2288304738644856816-n.jpg",
    alt: "Caravan interior",
  },
  {
    src: "https://i.ibb.co/JWP7MkcN/470222780-1548192932502333-7540886252590077590-n.jpg",
    alt: "Bathroom renovation",
  },
  {
    src: "https://i.ibb.co/rKjtDk1m/307092906-1072462010075430-401440523199274921-n.jpg",
    alt: "Bedroom design",
  },
  {
    src: "https://i.ibb.co/ZRC4J86z/Screenshot-2026-06-10-150409.png",
    alt: "Exterior construction",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function ProjectsSection() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (!lightbox) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, closeLightbox]);

  return (
    <section id="projects" className="py-24 px-4 bg-brand-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-gold-light text-xs uppercase tracking-[0.2em] font-medium">
            Our Work
          </span>
          <h2 className="font-display text-4xl md:text-5xl mt-3">
            Spaces We&apos;ve Transformed
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.alt}
              variants={itemVariants}
              className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-[4/3] bg-brand-card border border-brand-border hover:border-gold-mid/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(201,162,39,0.1)]"
            >
              <img
                src={project.src}
                alt={project.alt}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <button
                type="button"
                onClick={() => setLightbox(project.src)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-1 group-hover:translate-y-0 hover:bg-black/70"
                aria-label="Expand image"
              >
                <Maximize2 className="w-3.5 h-3.5 text-gold-light" />
              </button>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center mt-12"
        >
          <a
            href="https://www.facebook.com/Kitchens.TopNotchKitchens.flooring.cupboards"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-brand-border text-text-muted hover:text-gold-light hover:border-gold-mid/50 px-6 py-3 rounded-lg text-sm transition-all"
          >
            View All Projects
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <motion.img
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            src={lightbox}
            alt="Enlarged project photo"
            className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
