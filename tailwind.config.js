/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        royal: {
          50: "#eef4ff",
          100: "#d9e6ff",
          200: "#bcd3ff",
          300: "#8eb4ff",
          400: "#598bff",
          500: "#3366ff",
          600: "#1f47f5",
          700: "#1733d8",
          800: "#1a2da0",
          900: "#1b2c7d",
          950: "#0b1452",
          960: "#0a1140",
          970: "#070d33",
          980: "#050820",
          990: "#030515",
        },
        emerald2: {
          50: "#e9fdf3",
          100: "#c8fbe2",
          200: "#90f5c6",
          300: "#4feaa4",
          400: "#1fd986",
          500: "#0bbf6c",
          600: "#059a55",
          700: "#067a46",
          800: "#07603a",
          900: "#074e31",
          950: "#022d1b",
        },
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        display: ["Sora", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(31, 217, 134, 0.5)",
        royal: "0 20px 60px -20px rgba(51, 102, 255, 0.45)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "scale-in": "scaleIn 0.4s ease-out forwards",
      },
    },
  },
  plugins: [],
};
