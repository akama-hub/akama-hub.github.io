import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-noto)", "sans-serif"],
        heading: ["var(--font-inter)", "var(--font-noto)", "sans-serif"],
        mono: ["var(--font-mono)", "SFMono-Regular", "Menlo", "monospace"],
      },
      container: {
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
        },
      },
      colors: {
        brand: {
          indigo: "#6366F1",
          emerald: "#10B981",
          rose: "#F43F5E",
        },
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.gray.700"),
            "--tw-prose-headings": "rgb(var(--accent) / 1)",
            fontFamily: theme("fontFamily.sans").join(","),
          },
        },
        dark: {
          css: {
            "--tw-prose-body": theme("colors.slate.300"),
            "--tw-prose-headings": "rgb(var(--accent) / 1)",
          },
        },
      }),
    },
  },
  plugins: [typography, forms],
  darkMode: "media",
};

export default config;
