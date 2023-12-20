/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 0.8s ease-in-out forwards",
        fadeInDelayed: "fadeIn 0.8s ease-in-out forwards 0.2s",
        fadeInDelayed2: "fadeIn 0.8s ease-in-out forwards 0.4s",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(100px)" },
          "80%": { opacity: 0.4 },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeInDelayed: {
          "0%": { opacity: 0, transform: "translateY(100px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeInDelayed2: {
          "0%": { opacity: 0, transform: "translateY(100px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

