import Image from "next/image";
import Link from "next/link";
import { WordStagger, FadeUp } from "@/components/motion/FadeUp";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { SITE_NAME } from "@/lib/site";

/**
 * Closing section — playbook calls for this section's OWN ambient video;
 * no footage available in this build, so it reuses the material macro as a
 * still ground with the same top/bottom melt so it still reads as one shot.
 */
export function CinematicCTA() {
  return (
    <section className="relative overflow-hidden bg-ground pt-28">
      <div className="absolute inset-0 z-0">
        <Image src="/images/material.png" alt="" fill className="object-cover opacity-35" />
        <div className="absolute inset-0 bg-ground/70" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[200px] bg-gradient-to-b from-ground to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[200px] bg-gradient-to-t from-ground to-transparent" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center md:px-10">
        <FadeUp>
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/60">
            Harbor Goods
          </p>
        </FadeUp>
        <WordStagger
          as="h2"
          text="Buy it once. Carry it always."
          className="mx-auto mt-5 justify-center text-4xl italic leading-[0.95] tracking-tight text-white md:text-6xl"
        />
        <FadeUp delay={0.2} className="mx-auto mt-6 max-w-md text-white/60">
          No seasons, no drops, no reasons to replace it. Just a bag built to
          get better with you.
        </FadeUp>
        <FadeUp delay={0.3} className="mt-9 flex flex-wrap justify-center gap-4">
          <MagneticButton href="/shop" variant="solid">
            Shop the collection
          </MagneticButton>
          <MagneticButton href="/blog" variant="glass">
            Read the journal
          </MagneticButton>
        </FadeUp>
      </div>

      <footer className="relative z-10 mt-32 border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-white/50 md:flex-row md:items-center md:justify-between md:px-10">
          <p>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/shop" className="hover:text-white">Shop</Link>
            <Link href="/blog" className="hover:text-white">Journal</Link>
            <Link href="#story" className="hover:text-white">Story</Link>
            <Link href="/legal/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/legal/cookies" className="hover:text-white">Cookies</Link>
          </nav>
        </div>
      </footer>
    </section>
  );
}
