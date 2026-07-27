"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

/** Primary CTA that eases toward the cursor within its hover area (desktop pointer only). */
export function MagneticButton({
  href,
  children,
  className,
  onClick,
  variant = "solid",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "solid" | "glass";
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  const onMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    setPos({ x: dx * 0.32, y: dy * 0.45 });
  };
  const onLeave = () => {
    setHover(false);
    setPos({ x: 0, y: 0 });
  };

  const base =
    variant === "solid"
      ? "bg-paper text-ground"
      : "liquid-glass text-paper";

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={onLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 14, mass: 0.3 }}
      whileTap={{ scale: 0.96 }}
      className={`inline-flex items-center justify-center rounded-full px-7 py-3.5 text-[13px] font-medium uppercase tracking-[0.14em] transition-colors ${base} ${className ?? ""}`}
    >
      <motion.span
        animate={{ x: pos.x * -0.35 * 0.6 * (hover ? 1 : 0), y: pos.y * -0.35 * 0.6 * (hover ? 1 : 0) }}
        transition={{ type: "spring", stiffness: 150, damping: 14, mass: 0.3 }}
      >
        {children}
      </motion.span>
    </motion.a>
  );
}
