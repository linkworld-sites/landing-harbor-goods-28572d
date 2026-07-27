import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ground: "#0a0a0a",
        moss: "#1a2420",
        paper: "#e8e6e2",
        taupe: "#c2beb4",
        sage: "#5a6d64",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Geist", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
