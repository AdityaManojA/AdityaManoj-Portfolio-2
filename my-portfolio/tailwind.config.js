/** @type {import('tailwindcss').Config} */
export default {
  // Specify all files that should be scanned for Tailwind classes
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#F97316", // Orange-500 from Tailwind palette, vibrant and matches image 1's accent
        "background-light": "#FFF7ED", // A warm, creamy off-white inspired by image 1
        "background-dark": "#1C1C1E", // A very dark gray, almost black
        "text-light": "#1C1C1E", // Dark text for light mode
        "text-dark": "#E5E5E7", // Light gray text for dark mode
        "secondary-text-light": "#58585C", // A slightly muted gray for light mode
        "secondary-text-dark": "#A0A0A5", // A lighter muted gray for dark mode
        "border-light": "#E5E7EB", // Light gray border
        "border-dark": "#3A3A3C", // Dark gray border
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "12px", // A modern, slightly rounded corner
        full: "9999px",
      },
    },
  },
  plugins: [],
};