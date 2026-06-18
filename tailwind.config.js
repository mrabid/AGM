/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: {
          950: "#0b1628",
          900: "#122440",
          800: "#1a3054",
          700: "#1e3a66",
          100: "#e8edf5",
          50: "#f4f7fb",
        },
        accent: {
          gold: "#c6a86d",
          smoke: "#9ea3ad",
        },
      },
      boxShadow: {
        soft: "0 12px 40px rgba(0, 0, 0, 0.20)",
      },
      fontFamily: {
        sans: ["Inter", "Manrope", "Helvetica Neue", "Arial", "sans-serif"],
      },
      backgroundImage: {
        noise:
          "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.06), transparent 40%), radial-gradient(circle at 80% 10%, rgba(198,168,109,0.08), transparent 35%), radial-gradient(circle at 80% 90%, rgba(255,255,255,0.04), transparent 50%)",
      },
    },
  },
  plugins: [],
};

