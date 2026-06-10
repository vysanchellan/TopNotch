"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Maximize2 } from "lucide-react";

const projects = [
  {
    src: "https://i.ibb.co/Q3fMRWpd/476817289-1586279152027044-6385726897394675803-n.jpg",
    label: "Kitchen Renovation",
  },
  {
    src: "https://i.ibb.co/v4MCHM3c/118837587-619765352011767-8308457006625872218-n.jpg",
    label: "Modern Living Room",
  },
  {
    src: "https://i.ibb.co/qLctcc2G/307637447-1072446033410361-2288304738644856816-n.jpg",
    label: "Caravan Interior",
  },
  {
    src: "https://i.ibb.co/JWP7MkcN/470222780-1548192932502333-7540886252590077590-n.jpg",
    label: "Bathroom Renovation",
  },
  {
    src: "https://i.ibb.co/rKjtDk1m/307092906-1072462010075430-401440523199274921-n.jpg",
    label: "Bedroom Design",
  },
  {
    src: "https://i.ibb.co/ZRC4J86z/Screenshot-2026-06-10-150409.png",
    label: "Exterior Construction",
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
              key={project.label}
              variants={itemVariants}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-[4/3] bg-brand-card border border-brand-border hover:border-gold-mid/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(201,162,39,0.1)]"
            >
              <img
                src={project.src}
                alt={project.label}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              <div className="absolute inset-0 flex flex-col items-start justify-end p-5 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0">
                <span className="text-sm font-medium text-white drop-shadow-lg">
                  {project.label}
                </span>
              </div>
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-1 group-hover:translate-y-0">
                <Maximize2 className="w-3.5 h-3.5 text-gold-light" />
              </div>
              {hoveredIndex === index && (
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-gold-mid to-transparent" />
              )}
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
    </section>
  );
}
