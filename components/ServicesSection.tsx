"use client";

import { motion } from "framer-motion";
import { BentoGridShowcase } from "@/components/ui/bento-product-features";
import {
  Hammer,
  Truck,
  Home,
  Package,
  Layers,
  Paintbrush,
  Zap,
  Droplets,
} from "lucide-react";

const services = [
  {
    title: "Renovations",
    description:
      "Full home and commercial renovations — kitchens, bathrooms, living spaces transformed with precision craftsmanship.",
    icon: <Hammer className="w-5 h-5 text-gold-mid" />,
    status: "Popular",
    tags: ["Interior", "Full Home"],
  },
  {
    title: "Motor Homes",
    description:
      "Custom-built motor homes designed for comfort and durability. Your dream home on wheels.",
    icon: <Truck className="w-5 h-5 text-gold-mid" />,
    status: "Signature",
    tags: ["Mobile", "Custom Build"],
  },
  {
    title: "Caravans",
    description:
      "Caravan fit-outs and full builds. Modern interiors, quality finishes, built for the open road.",
    icon: <Home className="w-5 h-5 text-gold-mid" />,
    tags: ["Mobile Living"],
  },
  {
    title: "Built-in Cupboards",
    description:
      "Bespoke built-in storage solutions — wardrobes, kitchen cabinetry, and custom shelving.",
    icon: <Package className="w-5 h-5 text-gold-mid" />,
    status: "Available",
    tags: ["Cabinetry", "Storage"],
  },
  {
    title: "Flooring & Tiling",
    description:
      "Professional flooring installation — tiles, laminate, hardwood. Flawless finish every time.",
    icon: <Layers className="w-5 h-5 text-gold-mid" />,
    tags: ["Flooring", "Tiling"],
  },
  {
    title: "Painting",
    description:
      "Interior and exterior painting with premium finishes that last.",
    icon: <Paintbrush className="w-5 h-5 text-gold-mid" />,
    tags: ["Interior", "Exterior"],
  },
  {
    title: "Electrical",
    description:
      "Certified electrical installations, upgrades, and repairs for residential and commercial spaces.",
    icon: <Zap className="w-5 h-5 text-gold-mid" />,
    status: "Certified",
    tags: ["Electrical"],
  },
  {
    title: "Plumbing",
    description:
      "Full plumbing services — new installations, repairs, and complete bathroom fit-outs.",
    icon: <Droplets className="w-5 h-5 text-gold-mid" />,
    tags: ["Plumbing", "Fit-out"],
  },
];

const ServiceCard = ({
  title,
  description,
  icon,
  status,
  tags,
}: (typeof services)[number]) => (
  <div className="h-full bg-brand-card border border-brand-border hover:border-gold-mid/50 rounded-2xl p-6 transition-all hover:shadow-[0_0_24px_rgba(201,162,39,0.08)] flex flex-col">
    <div className="flex items-start justify-between mb-4">
      <div className="w-10 h-10 rounded-lg bg-gold-mid/10 flex items-center justify-center">
        {icon}
      </div>
      {status && (
        <span className="text-[10px] uppercase tracking-wider bg-gold-mid/10 text-gold-light px-2.5 py-1 rounded-full">
          {status}
        </span>
      )}
    </div>
    <h3 className="font-display text-xl mb-2">{title}</h3>
    <p className="text-sm text-text-muted leading-relaxed mb-4 flex-1">
      {description}
    </p>
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 text-text-muted"
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
);

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 px-4 bg-brand-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-gold-light text-xs uppercase tracking-[0.2em] font-medium">
            What We Do
          </span>
          <h2 className="font-display text-4xl md:text-5xl mt-3 mb-4">
            Our Services
          </h2>
          <p className="text-text-muted max-w-xl mx-auto">
            From a single room to a complete build — we handle every detail.
          </p>
        </motion.div>

        {/* First 6 services in bento grid */}
        <BentoGridShowcase
          integration={<ServiceCard {...services[0]} />}
          trackers={<ServiceCard {...services[1]} />}
          statistic={<ServiceCard {...services[2]} />}
          focus={<ServiceCard {...services[3]} />}
          productivity={<ServiceCard {...services[4]} />}
          shortcuts={<ServiceCard {...services[5]} />}
        />

        {/* Remaining 2 services in a row */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.slice(6).map((item) => (
            <motion.div key={item.title} variants={itemVariants}>
              <ServiceCard {...item} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
