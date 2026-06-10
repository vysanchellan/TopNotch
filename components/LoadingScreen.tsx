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
  const [showLoading, setShowLoading] = useState(true);
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [showQuestionMark, setShowQuestionMark] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const currentQuestion = questions[textIndex];

  const advanceToNext = useCallback(() => {
    if (textIndex < questions.length - 1) {
      setTextIndex((i) => i + 1);
      setCharIndex(0);
      setShowQuestionMark(false);
    } else {
      setShowQuestionMark(true);
      setTimeout(() => setFadeOut(true), 800);
      setTimeout(() => setShowLoading(false), 2000);
    }
  }, [textIndex]);

  useEffect(() => {
    if (fadeOut) return;

    if (charIndex < currentQuestion.length) {
      const t = setTimeout(() => setCharIndex((i) => i + 1), 50 + Math.random() * 40);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        if (!showQuestionMark) {
          setShowQuestionMark(true);
          setTimeout(advanceToNext, 1200);
        }
      }, 300);
      return () => clearTimeout(t);
    }
  }, [charIndex, currentQuestion.length, fadeOut, showQuestionMark, advanceToNext]);

  return (
    <>
      <AnimatePresence>
        {showLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] flex items-center justify-center"
          >
            <ConfettiBackground />
            <button
              onClick={() => { setFadeOut(true); setTimeout(() => setShowLoading(false), 800); }}
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
                {showQuestionMark && (
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={fadeOut || !showLoading ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        {children}
      </motion.div>
    </>
  );
}
