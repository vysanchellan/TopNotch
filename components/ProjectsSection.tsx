"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600",
    label: "Kitchen Renovation",
  },
  {
    src: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=600",
    label: "Modern Living Room",
  },
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
    label: "Caravan Interior",
  },
  {
    src: "https://images.unsplash.com/photo-1615873968403-89e068629265?w=600",
    label: "Bathroom Renovation",
  },
  {
    src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600",
    label: "Bedroom Design",
  },
  {
    src: "https://images.unsplash.com/photo-1464146072230-91cabc968266?w=600",
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.label}
              variants={itemVariants}
              className="group relative rounded-xl overflow-hidden cursor-pointer aspect-[4/3]"
            >
              <img
                src={project.src}
                alt={project.label}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                <span className="text-sm font-medium text-white">
                  {project.label}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center mt-10"
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
