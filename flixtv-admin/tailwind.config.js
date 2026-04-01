/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        admin: {
          dark: "#020617",
          card: "#0f172a",
          accent: "#0891b2"
        }
      }
    },
  },
  plugins: [],
}