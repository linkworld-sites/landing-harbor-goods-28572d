"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Reusable enter-once fade-up reveal for section copy, cards, rows. */
export function FadeUp({
  children,
  delay = 0,
  y = 24,
  className,
  amount = 0.2,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  amount?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Word-by-word stagger reveal for statement headlines. Wrap the headline text. */
export function WordStagger({
  text,
  className,
  as: Tag = "h2",
  startDelay = 0.15,
  step = 0.08,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
  startDelay?: number;
  step?: number;
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");
  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }
  return (
    <Tag className={`flex flex-wrap gap-x-[0.25em] ${className ?? ""}`}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: EASE, delay: startDelay + i * step }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}
