import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Blushloom Studio Brand Colors
        blush: {
          50: "#FFF5F7",
          100: "#FFE8ED",
          200: "#FFD1DB",
          300: "#FFB6C1", // Primary Blush Pink
          400: "#FFC0CB",
          500: "#FF9FB0",
          600: "#FF7A94",
          700: "#FF5578",
          800: "#E6004D",
          900: "#B30039",
        },
        lavender: {
          50: "#F9F8FF",
          100: "#F3F1FF",
          200: "#E6E6FA", // Soft Lavender
          300: "#D8BFD8",
          400: "#C8A2C8",
          500: "#B88BB8",
          600: "#9966CC",
          700: "#7A4D99",
          800: "#5C3A73",
          900: "#3D264D",
        },
        ivory: {
          50: "#FFFFF0", // Ivory White
          100: "#FFFEF5",
          200: "#FFFDE6",
          300: "#FFFCD7",
          400: "#FFF9C4",
          500: "#FFF59D",
        },
        peach: {
          50: "#FFF8F0",
          100: "#FFEFE0",
          200: "#FFE5B4", // Peach
          300: "#FFDAB9",
          400: "#FFCFA3",
          500: "#FFC48D",
          600: "#FFB366",
          700: "#FF9933",
          800: "#E67300",
          900: "#B35900",
        },
        sage: {
          50: "#F5F8F3",
          100: "#E8F0E3",
          200: "#D4E5CA",
          300: "#B2C9AB", // Sage Green
          400: "#9DC183",
          500: "#88B36A",
          600: "#6F9A52",
          700: "#5A7F42",
          800: "#456332",
          900: "#304722",
        },
        rose: {
          50: "#FDF5F5",
          100: "#F9E8E8",
          200: "#E0BFB8", // Rose Gold
          300: "#D4A5A0",
          400: "#C88B88",
          500: "#B76E79",
          600: "#A65565",
          700: "#8B4555",
          800: "#703645",
          900: "#552735",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "glass": "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "float": "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

// Made with Bob
