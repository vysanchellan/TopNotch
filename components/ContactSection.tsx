"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Send, MessageCircle } from "lucide-react";

const services = [
  "Renovations",
  "Motor Home / Caravan Build",
  "Built-in Cupboards",
  "Flooring & Tiling",
  "Painting",
  "Electrical",
  "Plumbing",
  "Multiple Services",
];

const contactMethods = ["WhatsApp", "Call", "Email"];

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    description: "",
    contactMethod: "WhatsApp",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({
      name: "",
      phone: "",
      email: "",
      service: "",
      description: "",
      contactMethod: "WhatsApp",
    });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-24 px-4 bg-brand-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-gold-light text-xs uppercase tracking-[0.2em] font-medium">
            Contact Us
          </span>
          <h2 className="font-display text-4xl md:text-5xl mt-3 mb-4">
            Let&apos;s Build Something Together
          </h2>
          <p className="text-text-muted max-w-xl mx-auto">
            Ready to start your project? Fill in your details and Rouel will get
            back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-8 items-start">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-7 space-y-5"
          >
            <div>
              <label className="text-sm text-text-muted mb-1.5 block">
                Full Name <span className="text-gold-mid">*</span>
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full h-10 rounded-lg bg-brand-surface border border-brand-border px-3 text-sm text-white placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-gold-mid/50 focus:border-gold-mid transition-all"
                placeholder="Your name"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-text-muted mb-1.5 block">
                  Phone Number <span className="text-gold-mid">*</span>
                </label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full h-10 rounded-lg bg-brand-surface border border-brand-border px-3 text-sm text-white placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-gold-mid/50 focus:border-gold-mid transition-all"
                  placeholder="+27 XX XXX XXXX"
                />
              </div>
              <div>
                <label className="text-sm text-text-muted mb-1.5 block">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full h-10 rounded-lg bg-brand-surface border border-brand-border px-3 text-sm text-white placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-gold-mid/50 focus:border-gold-mid transition-all"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-text-muted mb-1.5 block">
                Service Required <span className="text-gold-mid">*</span>
              </label>
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                required
                className="w-full h-10 rounded-lg bg-brand-surface border border-brand-border px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gold-mid/50 focus:border-gold-mid transition-all"
              >
                <option value="" disabled>
                  Select a service
                </option>
                {services.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-text-muted mb-1.5 block">
                Project Description <span className="text-gold-mid">*</span>
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full rounded-lg bg-brand-surface border border-brand-border px-3 py-2 text-sm text-white placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-gold-mid/50 focus:border-gold-mid transition-all resize-none"
                placeholder="Tell us about your project..."
              />
            </div>

            <div>
              <label className="text-sm text-text-muted mb-2 block">
                Preferred Contact Method
              </label>
              <div className="flex flex-wrap gap-4">
                {contactMethods.map((method) => (
                  <label
                    key={method}
                    className="flex items-center gap-2 text-sm cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="contactMethod"
                      value={method}
                      checked={form.contactMethod === method}
                      onChange={handleChange}
                      className="accent-gold-mid"
                    />
                    <span className="text-text-muted">{method}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="group w-full bg-gold-mid hover:bg-gold-light text-black font-medium py-3 rounded-lg transition-all flex items-center justify-center gap-2"
            >
              {submitted ? (
                "Thanks! Rouel will be in touch within 24 hours."
              ) : (
                <>
                  Send Message
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-5"
          >
            <div className="bg-brand-card border border-brand-border rounded-2xl p-8">
              <img
                src="https://i.ibb.co/8gydjndn/Screenshot-10-6-2026-14054-www-facebook-com.jpg"
                alt="Top Notch Creations"
                className="h-16 w-auto object-contain mx-auto mb-4"
              />
              <div className="w-12 h-0.5 bg-gold-mid mx-auto mb-6" />

              <h4 className="text-xs uppercase tracking-widest text-gold-light mb-4">
                Contact Details
              </h4>

              <div className="space-y-3 text-sm mb-6">
                <div className="flex items-center gap-3">
                  <span>📞</span>
                  <a
                    href="tel:0656396986"
                    className="text-text-muted hover:text-white transition-colors"
                  >
                    065 639 6986
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span>✉️</span>
                  <a
                    href="mailto:rouelmasterman33@gmail.com"
                    className="text-text-muted hover:text-white transition-colors break-all"
                  >
                    rouelmasterman33@gmail.com
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5">📍</span>
                  <span className="text-text-muted">
                    31 Barrowdale Close, Parklands,
                    <br />
                    Cape Town, 7441
                  </span>
                </div>
              </div>

              <a
                href="https://wa.me/27656396986"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded-lg text-sm font-medium transition-all mb-8"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </a>

              <h4 className="text-xs uppercase tracking-widest text-gold-light mb-3">
                Business Hours
              </h4>
              <div className="space-y-1.5 text-sm text-text-muted">
                <div className="flex justify-between">
                  <span>Mon – Fri</span>
                  <span>07:00 – 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>08:00 – 14:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>By appointment</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
