"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";

const smoothstep = (t: number) => t * t * (3 - 2 * t);

/**
 * Signature interactive scene — the object IS the message. A volumetric stack
 * of the actual bag, its hardware macro and its grain texture, tilting toward
 * the cursor like it is being turned over in your hands. Plain rAF, no libs.
 */
export function SignatureScene() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const wrap = wrapRef.current;
    if (!wrap) return;

    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    let idle = 0;
    let raf = 0;
    let hovering = false;

    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const nx = Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width / 2)));
      const ny = Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height / 2)));
      targetX = nx;
      targetY = ny;
      hovering = true;
    };
    const onLeave = () => {
      hovering = false;
      targetX = 0;
      targetY = 0;
    };

    const depths = [-60, -30, 0, 30, 60];

    const tick = () => {
      curX += (targetX - curX) * 0.08;
      curY += (targetY - curY) * 0.08;
      idle += 0.0016;
      const float = Math.sin(idle) * 4;
      const rotY = smoothstep(Math.abs(curX)) * Math.sign(curX) * 15;
      const rotX = -smoothstep(Math.abs(curY)) * Math.sign(curY) * 12;

      layerRefs.current.forEach((el, i) => {
        if (!el) return;
        const depth = depths[i] ?? 0;
        const parallax = (i - 2) * 6;
        el.style.transform = `translateZ(${depth}px) translateX(${curX * parallax}px) translateY(${curY * parallax * 0.6 + float * (hovering ? 0.3 : 1)}px)`;
      });
      if (wrap) {
        wrap.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-md"
      style={{ perspective: "1350px" }}
    >
      <div
        ref={wrapRef}
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d", transition: reduced ? undefined : "transform 0.05s linear" }}
      >
        <div
          ref={(el) => { layerRefs.current[0] = el; }}
          className="absolute inset-6 overflow-hidden rounded-[2rem] opacity-50 blur-md"
          style={{ transform: "translateZ(-60px)" }}
        >
          <Image src="/images/material.png" alt="" fill className="object-cover" />
        </div>
        <div
          ref={(el) => { layerRefs.current[1] = el; }}
          className="absolute inset-3 rounded-[2.25rem] bg-sage/20 blur-2xl"
          style={{ transform: "translateZ(-30px)" }}
        />
        <div
          ref={(el) => { layerRefs.current[2] = el; }}
          className="liquid-glass absolute inset-0 overflow-hidden rounded-[2rem] border border-white/10"
          style={{ transform: "translateZ(0px)" }}
        >
          <Image src="/images/hero.png" alt="Harbor Goods weekender bag" fill className="object-cover" priority sizes="(max-width: 768px) 90vw, 420px" />
        </div>
        <div
          ref={(el) => { layerRefs.current[3] = el; }}
          className="liquid-glass absolute -right-6 bottom-10 h-24 w-24 overflow-hidden rounded-xl border border-white/15 shadow-2xl md:h-28 md:w-28"
          style={{ transform: "translateZ(30px)" }}
        >
          <Image src="/images/detail.png" alt="Brass hardware detail" fill className="object-cover" sizes="112px" />
        </div>
        <div
          ref={(el) => { layerRefs.current[4] = el; }}
          className="liquid-glass absolute -left-4 top-8 rounded-full border border-white/15 px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-white/85 shadow-xl"
          style={{ transform: "translateZ(60px)" }}
        >
          Full-grain · No.0442
        </div>
      </div>
    </div>
  );
}
