"use client";

import { Diamond } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { WordStagger, FadeUp } from "@/components/motion/FadeUp";

const ROWS = [
  { period: "2011", milestone: "First patterns cut by hand", place: "Sailmaker's loft, Portland, ME" },
  { period: "2014", milestone: "First hundred bags sold — word of mouth only", place: "Same loft" },
  { period: "2017", milestone: "Moved to vegetable-tanned leather exclusively", place: "Portland, ME" },
  { period: "2020", milestone: "Every bag given a serial number and a repair promise", place: "Workshop expanded" },
  { period: "Today", milestone: "Still hand-cut, still small-batch", place: "Same five-person bench" },
];

export function Timeline() {
  const reduced = useReducedMotion();
  return (
    <section className="mx-auto max-w-4xl px-6 py-20 md:px-10">
      <FadeUp>
        <p className="text-[11px] uppercase tracking-[0.22em] text-white/60">Origin</p>
      </FadeUp>
      <WordStagger
        as="h2"
        text="Slow by design, not by accident."
        className="mt-4 max-w-xl text-4xl font-normal leading-[1.05] text-white md:text-5xl"
      />
      <FadeUp delay={0.15} className="mt-5 max-w-md text-white/70">
        Harbor Goods started at one bench with one rule: build it so it
        outlasts the trend that sold it.
      </FadeUp>

      <div className="liquid-glass mt-12 rounded-2xl border border-white/10 p-6 md:p-8">
        <div className="grid grid-cols-[auto_auto_1fr_auto] gap-x-3 gap-y-5 text-[13px] md:text-[14px]">
          {ROWS.map((r, i) => (
            <motion.div
              key={r.period}
              className="col-span-4 grid grid-cols-[auto_auto_1fr_auto] items-center gap-x-3"
              initial={reduced ? undefined : { opacity: 0, y: 16 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
            >
              <span className="text-white/50">{r.period}</span>
              <Diamond className="h-3 w-3 text-sage" strokeWidth={1.5} />
              <span className="text-white">{r.milestone}</span>
              <span className="text-right text-white/50">{r.place}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
