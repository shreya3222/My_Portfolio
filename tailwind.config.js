/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
 theme: {
  extend: {
    fontFamily: {
      heading: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-sora)", "sans-serif"],
    },
  },
},


  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
};
