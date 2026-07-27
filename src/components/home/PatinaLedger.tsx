"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { WordStagger, FadeUp } from "@/components/motion/FadeUp";

const FRAMES = [
  {
    label: "Day 1",
    tick: "0",
    note: "Off the shelf — natural veg-tan, stiff brass, not a mark on it.",
    filter: "saturate(1.08) brightness(1.05) contrast(0.98)",
  },
  {
    label: "Month 6",
    tick: "0.5",
    note: "Carried daily through a Chicago winter, oiled once.",
    filter: "saturate(1) brightness(1) contrast(1.02) sepia(0.08)",
  },
  {
    label: "Year 2",
    tick: "2",
    note: "Survived a cross-country move and two rainy seasons, oiled twice.",
    filter: "saturate(0.92) brightness(0.94) contrast(1.06) sepia(0.16)",
  },
  {
    label: "Year 10",
    tick: "10",
    note: "Patina fully set. Handed down once. Still the everyday bag.",
    filter: "saturate(0.82) brightness(0.86) contrast(1.1) sepia(0.26)",
  },
];

/**
 * The Patina Ledger — bespoke, drag-scrolled proof of "made to last": one bag,
 * one lighting setup, four points in its working life. No other leather brand
 * shows you the wear on purpose.
 */
export function PatinaLedger() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);

  const updateActive = () => {
    const el = containerRef.current;
    const track = el?.firstElementChild as HTMLElement | null;
    if (!el || !track) return;
    const maxScroll = track.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) return;
    const rect = track.getBoundingClientRect();
    const parentRect = el.getBoundingClientRect();
    const offset = parentRect.left - rect.left;
    const progress = Math.min(1, Math.max(0, offset / maxScroll));
    setActive(Math.round(progress * (FRAMES.length - 1)));
  };

  return (
    <section
      id="story"
      className="relative z-10 -mt-12 rounded-t-[3rem] bg-paper pb-24 pt-20 text-ground shadow-[0_-40px_80px_rgba(0,0,0,0.35)] md:pt-28"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <FadeUp>
          <p className="text-[11px] uppercase tracking-[0.22em] text-ground/60">
            The Patina Ledger
          </p>
        </FadeUp>
        <WordStagger
          as="h2"
          text="Evidence, not adjectives."
          className="mt-4 max-w-2xl text-4xl font-normal leading-[1.05] text-ground md:text-5xl"
        />
        <FadeUp delay={0.15} className="mt-5 max-w-lg text-ground/70">
          One bag. One lighting setup. Four points in its working life. Drag
          through the timeline below — what changes is only the leather.
        </FadeUp>
      </div>

      <div
        ref={containerRef}
        className={`mt-14 overflow-hidden px-6 md:px-10 ${reduced ? "" : "ledger-drag-cursor"}`}
      >
        <motion.div
          className="flex gap-6"
          drag={reduced ? false : "x"}
          dragConstraints={containerRef}
          dragElastic={0.06}
          onDrag={updateActive}
          whileTap={{ cursor: "grabbing" }}
        >
          {FRAMES.map((f) => (
            <div key={f.label} className="w-[78vw] shrink-0 sm:w-[380px] md:w-[420px]">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ground/60">
                {f.label} — {f.note}
              </p>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-ground/5">
                <Image
                  src="/images/detail.png"
                  alt={`Bag No. 0442, ${f.label}`}
                  fill
                  draggable={false}
                  className="object-cover"
                  style={{ filter: f.filter }}
                  sizes="(max-width: 768px) 78vw, 420px"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl px-6 md:px-10">
        <div className="relative h-px w-full bg-ground/15">
          {FRAMES.map((f, i) => (
            <div
              key={f.tick}
              className="absolute top-0 flex -translate-x-1/2 flex-col items-center"
              style={{ left: `${(i / (FRAMES.length - 1)) * 100}%` }}
            >
              <span
                className={`h-2 w-px transition-colors ${active === i ? "bg-sage" : "bg-ground/30"}`}
              />
              <span
                className={`mt-2 text-[11px] uppercase tracking-[0.18em] transition-colors ${active === i ? "text-sage" : "text-ground/50"}`}
              >
                {f.tick === "0" ? "Yr 0" : f.tick === "0.5" ? "Mo 6" : `Yr ${f.tick}`}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-14 text-center text-[11px] uppercase tracking-[0.22em] text-ground/50">
          This is bag No. 0442. It is still in service.
        </p>
      </div>
    </section>
  );
}
