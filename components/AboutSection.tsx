"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "500+", label: "Projects Completed" },
  { value: "10+", label: "Years Experience" },
  { value: "8", label: "Trades Under One Roof" },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 bg-brand-surface">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
        >
          <span className="text-gold-light text-xs uppercase tracking-[0.2em] font-medium">
            About Us
          </span>
          <h2 className="font-display text-4xl md:text-5xl mt-3 mb-6 leading-tight">
            Built by Hand.
            <br />
            Backed by Passion.
          </h2>
          <p className="text-text-muted leading-relaxed mb-8">
            Top Notch Creations &amp; Mobile Homes was founded by Rouel
            Masterman with one mission: to deliver dream spaces for every client
            — whether that&apos;s a renovated home, a custom-built caravan, or a
            mobile home designed for the open road.
          </p>
          <p className="text-text-muted leading-relaxed mb-10">
            Based in Parklands, Cape Town, we bring together skilled tradespeople
            across renovation, mobile home construction, electrical, plumbing,
            and interior fitting — all under one roof.
          </p>

          <div className="grid grid-cols-3 gap-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-gold-light font-display text-3xl md:text-4xl font-semibold">
                  {stat.value}
                </div>
                <div className="text-xs text-text-muted mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.2 }}
        >
          <div className="bg-brand-card border border-brand-border rounded-2xl p-8 text-center">
            <img
              src="https://i.ibb.co/8gydjndn/Screenshot-10-6-2026-14054-www-facebook-com.jpg"
              alt="Top Notch Creations"
              className="h-20 w-auto object-contain mx-auto mb-6"
            />
            <div className="w-12 h-0.5 bg-gold-mid mx-auto mb-4" />
            <h3 className="font-display text-xl mb-1">Rouel Masterman</h3>
            <p className="text-xs text-gold-light uppercase tracking-widest mb-6">
              Owner &middot; Top Notch Creations
            </p>

            <div className="space-y-3 text-sm text-left">
              <div className="flex items-center gap-3">
                <span className="text-gold-light">📞</span>
                <a href="tel:0656396986" className="text-text-muted hover:text-white transition-colors">
                  065 639 6986
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gold-light">✉️</span>
                <a href="mailto:rouelmasterman33@gmail.com" className="text-text-muted hover:text-white transition-colors break-all">
                  rouelmasterman33@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gold-light mt-0.5">📍</span>
                <span className="text-text-muted">
                  31 Barrowdale Close, Parklands,
                  <br />
                  Cape Town, 7441
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
