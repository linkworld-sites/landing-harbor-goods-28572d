// The only element that could only be Harbor Goods: the Patina Ledger — a
// drag-through timeline of one serialized bag's actual wear, offered as
// evidence instead of adjectives. No competitor's "quality" claim survives
// being shown the real thing at year ten.
import { Nav } from "@/components/home/Nav";
import { Hero } from "@/components/home/Hero";
import { PatinaLedger } from "@/components/home/PatinaLedger";
import { MarqueeStrip } from "@/components/home/MarqueeStrip";
import { StatCards } from "@/components/home/StatCards";
import { SignatureScene } from "@/components/home/SignatureScene";
import { Timeline } from "@/components/home/Timeline";
import { CinematicCTA } from "@/components/home/CinematicCTA";
import { FadeUp, WordStagger } from "@/components/motion/FadeUp";

export default function Home() {
  return (
    <main className="bg-ground">
      <Nav />
      <Hero />
      <PatinaLedger />

      <div className="relative z-10 bg-ground">
        <section className="mx-auto grid max-w-6xl gap-14 px-6 py-24 md:grid-cols-2 md:items-center md:px-10">
          <div>
            <FadeUp>
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/60">
                The object
              </p>
            </FadeUp>
            <WordStagger
              as="h2"
              text="Turn it over. Look closer."
              className="mt-4 text-4xl font-normal leading-[1.05] text-white md:text-5xl"
            />
            <FadeUp delay={0.15} className="mt-5 max-w-md text-white/70">
              Full-grain hide, hand-burnished edges, solid brass hardware set
              by hand — every detail is built to be looked at closely, for
              years.
            </FadeUp>
          </div>
          <SignatureScene />
        </section>

        <MarqueeStrip />
        <StatCards />
        <Timeline />
      </div>

      <CinematicCTA />
    </main>
  );
}
