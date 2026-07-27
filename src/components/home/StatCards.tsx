"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useInView, useReducedMotion } from "framer-motion";

const STATS = [
  { value: 20, suffix: "+", label: "Years each bag is designed to outlast, minimum.", img: "/images/material.png" },
  { value: 6, suffix: "", label: "Hours of hand-finishing that go into every bag.", img: "/images/detail.png" },
  { value: 100, suffix: "%", label: "Full-grain, vegetable-tanned leather. No exceptions.", img: "/images/hero.png" },
];

function CountUp({ value, active }: { value: number; active: boolean }) {
  const [display, setDisplay] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!active) return;
    if (reduced) {
      setDisplay(value);
      return;
    }
    const duration = 1200;
    const start = performance.now();
    let raf = 0;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setDisplay(Math.round(ease(t) * value));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, value, reduced]);

  return <span className="tabular-nums">{display}</span>;
}

export function StatCards() {
  return (
    <div className="mx-auto grid max-w-6xl gap-5 px-6 md:grid-cols-3 md:px-10">
      {STATS.map((s) => (
        <StatCard key={s.label} {...s} />
      ))}
    </div>
  );
}

function StatCard({ value, suffix, label, img }: (typeof STATS)[number]) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div
      ref={ref}
      className="noise-overlay relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl border border-white/10 bg-moss p-7 sm:aspect-[5/4] md:aspect-[4/5]"
    >
      <Image src={img} alt="" fill className="object-cover opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-t from-ground via-ground/70 to-ground/20" />
      <div className="relative z-10">
        <p className="text-5xl font-light tracking-tight text-white drop-shadow sm:text-6xl md:text-7xl lg:text-[88px]">
          <CountUp value={value} active={inView} />
          {suffix}
        </p>
        <p className="mt-3 max-w-[22ch] text-sm text-white/85">{label}</p>
      </div>
    </div>
  );
}
