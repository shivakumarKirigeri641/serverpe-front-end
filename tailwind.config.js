/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        /* Brand amber — preserved */
        primary: {
          50:  "#fff8ed",
          100: "#ffefd4",
          200: "#ffdb9f",
          300: "#ffc35e",
          400: "#ffa520",
          500: "#E8941A",
          600: "#D97706",
          700: "#b45309",
          800: "#923f0e",
          900: "#783610",
          950: "#431a06",
        },
        amber: {
          300: "#FFC150",
          400: "#F5A623",
          500: "#E8941A",
          600: "#D97706",
        },
        /* Light-theme surface tokens */
        cream: {
          50:  "#FEFCF8",
          100: "#FAF6EE",
          200: "#F5EDE0",
          300: "#EEE4D0",
          400: "#E0D4BC",
        },
        ink: {
          900: "#1A1A2E",
          700: "#2E2E48",
          500: "#4A4A65",
          300: "#7A7A95",
          100: "#B8B8CC",
        },
        /* Dark section tokens */
        dark: {
          900: "#06060A",
          800: "#0D0D14",
          700: "#111119",
          600: "#1A1A28",
        },
        teal: {
          400: "#2DD4BF",
          500: "#00B09E",
          600: "#00A87B",
        },
        coral: "#FF5E47",
        mint:  "#00C99A",
      },
      fontFamily: {
        display: ['"Fraunces"', "Georgia", "serif"],
        heading: ['"Sora"', "system-ui", "sans-serif"],
        body:    ['"DM Sans"', "system-ui", "sans-serif"],
        sans:    ['"DM Sans"', "system-ui", "sans-serif"],
        mono:    ['"Fira Code"', "monospace"],
      },
      fontSize: {
        display: [
          "clamp(3rem, 7vw, 6.5rem)",
          { lineHeight: "0.93", letterSpacing: "-0.03em", fontWeight: "700" },
        ],
        headline: [
          "clamp(1.8rem, 4vw, 3.2rem)",
          { lineHeight: "1.05", letterSpacing: "-0.025em", fontWeight: "700" },
        ],
        subheadline: [
          "clamp(1rem, 2vw, 1.25rem)",
          { lineHeight: "1.55", letterSpacing: "-0.01em" },
        ],
      },
      animation: {
        float:            "float 6s ease-in-out infinite",
        "blob-1":         "blobMove1 20s ease-in-out infinite",
        "blob-2":         "blobMove2 26s ease-in-out infinite",
        "blob-3":         "blobMove3 32s ease-in-out infinite",
        "drift-1":        "drift1 18s ease-in-out infinite",
        "drift-2":        "drift2 24s ease-in-out infinite",
        "star-pulse":     "starPulse 3s ease-in-out infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
        "pulse-slow":     "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer:          "shimmer 2.5s linear infinite",
        "spin-slow":      "spin 8s linear infinite",
        "slide-up":       "slideUp 0.6s cubic-bezier(0.16,1,0.3,1) both",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-14px)" },
        },
        blobMove1: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%":      { transform: "translate(40px, -50px) scale(1.1)" },
          "66%":      { transform: "translate(-25px, 25px) scale(0.92)" },
        },
        blobMove2: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%":      { transform: "translate(-35px, 35px) scale(1.06)" },
          "66%":      { transform: "translate(30px, -25px) scale(0.94)" },
        },
        blobMove3: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "50%":      { transform: "translate(20px, 45px) scale(1.08)" },
        },
        drift1: {
          "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
          "33%":      { transform: "translate(30px, -40px) rotate(120deg)" },
          "66%":      { transform: "translate(-20px, 20px) rotate(240deg)" },
        },
        drift2: {
          "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
          "50%":      { transform: "translate(-25px, 35px) rotate(180deg)" },
        },
        starPulse: {
          "0%, 100%": { opacity: "0.15", transform: "scale(1)" },
          "50%":      { opacity: "0.7",  transform: "scale(1.8)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%":      { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          to: { backgroundPosition: "-200% center" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
      backgroundImage: {
        "gradient-radial":  "radial-gradient(var(--tw-gradient-stops))",
        "mesh-amber":       "radial-gradient(ellipse 80% 60% at 50% 0%, #FFF2D8 0%, #FEFCF8 60%)",
        "mesh-cream":       "radial-gradient(ellipse 60% 80% at 30% 50%, #FFF0D5 0%, #FAF6EE 70%)",
      },
      boxShadow: {
        amber:      "0 8px 30px rgba(232,148,26,0.30)",
        "amber-sm": "0 4px 16px rgba(232,148,26,0.18)",
        card:       "0 1px 3px rgba(26,26,46,0.06), 0 8px 24px rgba(26,26,46,0.08)",
        "card-lg":  "0 4px 6px rgba(26,26,46,0.04), 0 20px 48px rgba(26,26,46,0.10)",
        elevated:   "0 24px 64px rgba(26,26,46,0.16)",
        warm:       "0 8px 32px rgba(232,148,26,0.12), 0 2px 8px rgba(26,26,46,0.06)",
      },
    },
  },
  plugins: [],
};
