import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      xss: "350px",

      xs: "450px",

      sm: "640px",

      md: "768px",

      lg: "1024px",

      xl: "1280px",

      "2xl": "1536px",
    },

    extend: {
      colors: {
        "gray-0": "#18212f",
        backdrop: "rgba(255, 255, 255, 0.1)",
        darkBackdrop: "rgba(0, 0, 0, 0.3)",
      },
      borderWidth: {
        12: "12px",
      },
      fontFamily: {
        sono: ["var(--fontFamily_Sono)"],
        // mono: ["var(--font-mono)"],
      },
    },
  },
  plugins: [],
};
export default config;
