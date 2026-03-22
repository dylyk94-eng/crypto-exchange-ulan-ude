import type { Config } from "tailwindcss";

const config: {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "void-bg": "#020408",
        "deep-bg": "#050a14",
        "neon-cyan": "#00f5ff",
        "neon-purple": "#9d4edd",
        "neon-pink": "#ff006e",
        "neon-lime": "#39ff14",
        "neon-yellow": "#fff01f",
        "text-primary": "#ffffff",
        "text-secondary": "rgba(255, 255, 255, 0.7)",
        "text-tertiary": "rgba(255, 255, 255, 0.4)",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        '128': '32rem',
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        pulse: "pulse 2s ease-in-out infinite",
        slide: "slide 0.6s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        slide: {
          from: {
            opacity: "0",
            transform: "translateY(60px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      boxShadow: {
        "neon-cyan": "0 0 20px rgba(0, 245, 255, 0.3), 0 0 40px rgba(0, 245, 255, 0.1)",
        "neon-purple": "0 0 20px rgba(157, 78, 221, 0.3), 0 0 40px rgba(157, 78, 221, 0.1)",
        "neon-pink": "0 0 20px rgba(255, 0, 110, 0.3), 0 0 40px rgba(255, 0, 110, 0.1)",
        "glow": "0 0 30px currentColor",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
