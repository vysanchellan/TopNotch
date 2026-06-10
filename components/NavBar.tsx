"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Packages", href: "#packages" },
  { label: "Contact", href: "#contact" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/70 border-b border-brand-border transition-shadow ${
        scrolled ? "shadow-[0_4px_30px_rgba(0,0,0,0.4)]" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <a href="#">
          <img
            src="https://i.ibb.co/8gydjndn/Screenshot-10-6-2026-14054-www-facebook-com.jpg"
            alt="Top Notch Creations"
            className="h-12 w-auto object-contain"
          />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-gray-300 hover:text-gold-light transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="border border-gold-mid text-gold-light hover:bg-gold-mid hover:text-black px-4 py-2 rounded-lg text-sm font-medium transition-all"
          >
            Get a Quote
          </a>
        </div>

        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden md:hidden border-t border-brand-border bg-black/90 backdrop-blur-md"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-sm text-gray-300 hover:text-gold-light py-2 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="border border-gold-mid text-gold-light hover:bg-gold-mid hover:text-black px-4 py-2 rounded-lg text-sm font-medium text-center transition-all"
              >
                Get a Quote
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
