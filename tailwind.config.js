/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#ec1313", // Indo Red
        "secondary": "#FFD700", // Oz Gold
        "background-light": "#fcf8f8",
        "background-dark": "#1b0d0d",
        "text-dark": "#1b0d0d",
        "text-light": "#fcf8f8",
        "muted": "#9a4c4c"
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"],
        "sans": ["Inter", "sans-serif"]
      },
      borderRadius: {
        "lg": "0.5rem",
        "xl": "0.75rem",
      },
    },
  },
  plugins: [],
}
