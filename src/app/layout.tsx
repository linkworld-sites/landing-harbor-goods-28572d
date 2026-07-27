import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { FunnelTracker } from "@/components/FunnelTracker";
import { EditBridge } from "@/components/EditBridge";
import { CookieConsent } from "@/components/CookieConsent";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: SITE_URL ? new URL(SITE_URL) : undefined,
  title: { default: `${SITE_NAME} — Leather Goods Built to Age Well`, template: `%s — ${SITE_NAME}` },
  description:
    "Harbor Goods makes vegetable-tanned leather bags and accessories built to last decades, not seasons. Honest materials, quiet construction, no trend-chasing.",
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL || undefined,
      description:
        "Harbor Goods crafts vegetable-tanned leather goods designed to age well over decades.",
    },
    {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL || undefined,
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-ground font-sans text-paper antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <FunnelTracker />
        <EditBridge />
        <SmoothScroll>{children}</SmoothScroll>
        <CookieConsent />
      </body>
    </html>
  );
}
