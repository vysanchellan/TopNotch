"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ConfettiBackground from "@/components/ui/confetti-background";

const questions = [
  "Ready to build your dream",
  "Looking for perfection",
  "Dreaming of something new",
];

export default function LoadingScreen({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true);
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [showQ, setShowQ] = useState(false);

  const currentQuestion = questions[textIndex];

  const advanceToNext = useCallback(() => {
    if (textIndex < questions.length - 1) {
      setTextIndex((i) => i + 1);
      setCharIndex(0);
      setShowQ(false);
    } else {
      setVisible(false);
    }
  }, [textIndex]);

  useEffect(() => {
    if (!visible) return;
    if (charIndex < currentQuestion.length) {
      const t = setTimeout(() => setCharIndex((i) => i + 1), 50 + Math.random() * 40);
      return () => clearTimeout(t);
    }
    if (!showQ) {
      const t = setTimeout(() => setShowQ(true), 300);
      return () => clearTimeout(t);
    }
    const t = setTimeout(advanceToNext, 1200);
    return () => clearTimeout(t);
  }, [charIndex, currentQuestion.length, showQ, advanceToNext, visible]);

  const skip = () => setVisible(false);

  return (
    <>
      <div className="min-h-screen">
        {children}
      </div>

      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] flex items-center justify-center"
          >
            <ConfettiBackground />
            <button
              onClick={skip}
              className="absolute top-6 right-6 z-20 flex items-center gap-1.5 text-xs text-text-muted hover:text-gold-light transition-colors"
            >
              <X className="w-3 h-3" />
              Skip
            </button>
            <div className="relative z-10 text-center px-4">
              <motion.p
                key={textIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="font-display text-2xl md:text-4xl lg:text-5xl text-white"
              >
                {currentQuestion.slice(0, charIndex)}
                <motion.span
                  animate={{ opacity: [0, 1] }}
                  transition={{ repeat: Infinity, duration: 0.6 }}
                  className="inline-block w-[2px] h-[1em] bg-gold-light ml-1 align-middle"
                />
                {showQ && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-gold-light ml-1"
                  >
                    ?
                  </motion.span>
                )}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
