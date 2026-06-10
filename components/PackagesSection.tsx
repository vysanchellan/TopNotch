"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

const packages = [
  {
    name: "Essential",
    tagline: "Single room or targeted fix",
    price: "From R 8,500",
    period: "per project",
    features: [
      "Single trade service (painting, tiling, or plumbing)",
      "Free on-site assessment",
      "3-day turnaround estimate",
      "Basic warranty coverage",
      "WhatsApp support",
    ],
    cta: "Get a Quote",
    highlight: false,
  },
  {
    name: "Premium",
    tagline: "Full room or multi-trade",
    price: "From R 25,000",
    period: "per project",
    features: [
      "Up to 3 trades combined",
      "Kitchen or bathroom full fit-out",
      "Materials sourcing & supply",
      "Project management included",
      "6-month workmanship warranty",
      "Priority scheduling",
    ],
    cta: "Start Your Project",
    highlight: true,
  },
  {
    name: "Full Build",
    tagline: "Complete renovation or mobile home",
    price: "Custom Quote",
    period: "scoped per project",
    features: [
      "All trades — end-to-end build",
      "Mobile home or caravan builds",
      "Architectural consultation",
      "Custom cabinetry & flooring",
      "Electrical & plumbing complete",
      "12-month warranty",
      "Dedicated project manager",
    ],
    cta: "Book Consultation",
    highlight: false,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function PackagesSection() {
  return (
    <section id="packages" className="py-24 px-4 bg-brand-surface">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-gold-light text-xs uppercase tracking-[0.2em] font-medium">
            Packages
          </span>
          <h2 className="font-display text-4xl md:text-5xl mt-3 mb-4">
            Choose Your Package
          </h2>
          <p className="text-text-muted max-w-xl mx-auto">
            Transparent pricing, no hidden costs. Every package includes a free
            consultation.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {packages.map((pkg) => (
            <motion.div
              key={pkg.name}
              variants={cardVariants}
              className={`relative rounded-2xl p-8 flex flex-col transition-all hover:scale-[1.02] ${
                pkg.highlight
                  ? "bg-brand-card border-2 border-gold-mid shadow-[0_0_40px_rgba(201,162,39,0.12)]"
                  : "bg-brand-card border border-brand-border"
              }`}
            >
              {pkg.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold-mid text-black text-xs font-semibold uppercase tracking-wider px-4 py-1 rounded-full">
                  Most Popular
                </span>
              )}

              <h3 className="font-display text-2xl mb-1">{pkg.name}</h3>
              <p className="text-sm text-text-muted mb-5">{pkg.tagline}</p>

              <div className="mb-6">
                <span className="text-gold-light font-display text-4xl">
                  {pkg.price}
                </span>
                <span className="text-text-muted text-sm ml-2">{pkg.period}</span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 text-gold-mid mt-0.5 shrink-0" />
                    <span className="text-text-muted">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`group flex items-center justify-center gap-2 w-full py-3 rounded-lg text-sm font-medium transition-all ${
                  pkg.highlight
                    ? "bg-gold-mid hover:bg-gold-light text-black"
                    : "border border-gold-mid text-gold-light hover:bg-gold-mid/10"
                }`}
              >
                {pkg.cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
