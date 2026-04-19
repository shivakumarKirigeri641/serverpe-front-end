/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef5ff",
          100: "#d9e8ff",
          200: "#bbd5ff",
          300: "#8cbbff",
          400: "#5596ff",
          500: "#2e6fff",
          600: "#1a4ff5",
          700: "#1239d6",
          800: "#1530ad",
          900: "#0a1f5c",
          950: "#060e2f",
        },
        cyan: {
          50: "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63",
        },
        dark: {
          900: "#0B0F1A",
          800: "#0F1629",
          700: "#141C36",
          600: "#1A2544",
        },
        surface: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
        },
      },
      fontFamily: {
        heading: ['"Sora"', "sans-serif"],
        body: ['"Outfit"', "sans-serif"],
        sans: ['"Outfit"', "sans-serif"],
      },
      fontSize: {
        display: [
          "clamp(2.5rem, 6vw, 5rem)",
          { lineHeight: "1.08", letterSpacing: "-0.03em", fontWeight: "700" },
        ],
        headline: [
          "clamp(1.8rem, 4vw, 3.2rem)",
          { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "600" },
        ],
        subheadline: [
          "clamp(1.1rem, 2vw, 1.5rem)",
          { lineHeight: "1.4", letterSpacing: "-0.01em" },
        ],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        "slide-up": "slideUp 0.5s ease-out",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
        "text-shimmer": "textShimmer 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)" },
          "100%": { boxShadow: "0 0 40px rgba(6, 182, 212, 0.6)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        textShimmer: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-pattern":
          "linear-gradient(135deg, #0B0F1A 0%, #0a1f5c 50%, #0e7490 100%)",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.04), 0 6px 16px rgba(0,0,0,0.06)",
        "card-hover":
          "0 4px 12px rgba(0,0,0,0.06), 0 16px 40px rgba(0,0,0,0.1)",
        elevated: "0 8px 30px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};
