import {
  Hammer,
  Scissors,
  Ruler,
  Droplet,
  Anchor,
  Compass,
  ShieldCheck,
  Leaf,
  Package,
  Feather,
} from "lucide-react";
import { FadeUp } from "@/components/motion/FadeUp";

const ICONS = [Hammer, Scissors, Ruler, Droplet, Anchor, Compass, ShieldCheck, Leaf, Package, Feather];

function Row({ direction }: { direction: "left" | "right" }) {
  const items = [...ICONS, ...ICONS];
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className={`group flex w-max gap-4 ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"} hover:[animation-play-state:paused]`}
      >
        {items.map((Icon, i) => (
          <div
            key={i}
            className="liquid-glass flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white/10 md:h-16 md:w-16"
          >
            <Icon className="h-4 w-4 text-white/70" strokeWidth={1.5} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function MarqueeStrip() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:px-10">
      <FadeUp>
        <p className="text-center text-[11px] uppercase tracking-[0.22em] text-white/60">
          Every stitch, cut and rivet — done by hand, checked twice
        </p>
      </FadeUp>
      <div className="mt-10 space-y-4">
        <Row direction="left" />
        <Row direction="right" />
      </div>
    </section>
  );
}
