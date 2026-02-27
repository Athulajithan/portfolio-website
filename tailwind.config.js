/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: "#00f5ff",
        background: "#0a0f1c",
      },

      animation: {
        float: "float 6s ease-in-out infinite",
        fadeIn: "fadeIn 1s ease-in-out",
      },

      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },

  plugins: [],
};
