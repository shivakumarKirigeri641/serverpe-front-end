/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        /* Monochromatic Primary */
        primary: {
          50:  "#fafafa",
          100: "#f4f4f5",
          200: "#e4e4e7",
          300: "#d4d4d8",
          400: "#a1a1aa",
          500: "#71717a",
          600: "#52525b",
          700: "#3f3f46",
          800: "#27272a",
          900: "#18181b",
          950: "#0a0a0a",
        },
        /* Accent: Action Blue */
        accent: {
          50:  "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#2563eb",
          600: "#1d4ed8",
          700: "#1e40af",
        },
        /* Success Green */
        success: {
          50:  "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
        },
        /* Surface tokens */
        surface: {
          0:   "#ffffff",
          50:  "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
        },
        /* Dark section tokens */
        dark: {
          950: "#0a0a0a",
          900: "#0c0c0c",
          800: "#18181b",
          700: "#27272a",
          600: "#3f3f46",
        },
        ink: {
          900: "#0a0a0a",
          700: "#18181b",
          500: "#71717a",
          300: "#a1a1aa",
          100: "#e4e4e7",
        },
      },
      fontFamily: {
        sans:    ['"Plus Jakarta Sans"', "system-ui", "-apple-system", "sans-serif"],
        heading: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        body:    ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        mono:    ['"SF Mono"', '"Fira Code"', '"Cascadia Code"', "Consolas", "monospace"],
      },
      fontSize: {
        display: [
          "clamp(3rem, 7vw, 6.5rem)",
          { lineHeight: "0.9", letterSpacing: "-0.05em", fontWeight: "900" },
        ],
        "display-lg": [
          "clamp(4rem, 9vw, 8rem)",
          { lineHeight: "0.9", letterSpacing: "-0.05em", fontWeight: "900" },
        ],
        headline: [
          "clamp(2rem, 5vw, 3.5rem)",
          { lineHeight: "0.95", letterSpacing: "-0.05em", fontWeight: "900" },
        ],
        "headline-lg": [
          "clamp(2.5rem, 6vw, 5rem)",
          { lineHeight: "0.9", letterSpacing: "-0.05em", fontWeight: "900" },
        ],
        subheadline: [
          "clamp(1rem, 2vw, 1.25rem)",
          { lineHeight: "1.55", letterSpacing: "-0.01em" },
        ],
      },
      borderRadius: {
        '4xl': '32px',
        '5xl': '40px',
      },
      animation: {
        float:            "float 6s ease-in-out infinite",
        "pulse-slow":     "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-dot":      "pulseDot 2s ease-in-out infinite",
        "slide-up":       "slideUp 0.6s cubic-bezier(0.16,1,0.3,1) both",
        "spin-slow":      "spin 8s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-14px)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%":      { opacity: "0.5", transform: "scale(1.3)" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
      boxShadow: {
        card:       "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)",
        "card-lg":  "0 4px 6px rgba(0,0,0,0.03), 0 12px 32px rgba(0,0,0,0.08)",
        elevated:   "0 24px 64px rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [],
};
