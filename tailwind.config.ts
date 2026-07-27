import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        porcelain: "#FAF8F5",
        ink: "#1C1A17",
        espresso: "#3B2A20",
        taupe: "#8A6B4F",
        sand: "#C9B79C",
        copper: "#B87333",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
