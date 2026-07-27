"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { WordStagger, FadeUp } from "@/components/motion/FadeUp";
import { MagneticButton } from "@/components/motion/MagneticButton";

/**
 * Fixed hero ground. Playbook calls for a standing hero VIDEO — this build has
 * no footage available, so the fixed layer is the real studio macro
 * (detail.png) instead, holding the same scroll-linked scale + handoff.
 */
export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div ref={ref} className="relative h-[100vh] w-full overflow-hidden">
      <motion.div
        className="fixed inset-0 z-0 h-screen w-full"
        style={reduced ? undefined : { scale }}
      >
        <Image
          src="/images/detail.png"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_25%_45%,rgba(0,0,0,0.55),transparent_65%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ground/60" />
      </motion.div>

      <motion.div
        style={reduced ? undefined : { y: copyY, opacity: copyOpacity }}
        className="relative z-10 flex h-full flex-col justify-center px-6 md:px-16"
      >
        <div className="max-w-[720px]">
          <FadeUp delay={0}>
            <p className="mb-6 text-[11px] uppercase tracking-[0.22em] text-white/70">
              Harbor Goods · Est. leather goods
            </p>
          </FadeUp>
          <WordStagger
            as="h1"
            text="Built to age. Not to trend."
            className="text-[13vw] leading-[0.95] font-normal text-white sm:text-6xl md:text-7xl lg:text-[80px]"
          />
          <motion.p
            initial={reduced ? undefined : { opacity: 0, y: 24 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
            className="mt-6 max-w-md text-base text-white/85 md:text-lg"
          >
            Vegetable-tanned leather, hand-finished in small batches — made to
            look better in year ten than it did on day one.
          </motion.p>
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 24 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 1.1 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <MagneticButton href="/shop" variant="solid">
              Shop the collection
            </MagneticButton>
            <MagneticButton href="#story" variant="glass">
              Read the story
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={reduced ? undefined : { opacity: 0 }}
        animate={reduced ? undefined : { opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute inset-x-0 bottom-8 z-10 flex justify-center"
      >
        <div className="flex flex-col items-center gap-2 text-white/60">
          <span className="text-[11px] uppercase tracking-[0.22em]">Scroll</span>
          <span className="h-8 w-px bg-white/40" />
        </div>
      </motion.div>
    </div>
  );
}
