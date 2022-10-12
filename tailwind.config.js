/** @type {import('tailwindcss').Config} */
module.exports = {
  content:["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        black_tile: "#b7c0d8",
        white_tile: "#e8edf9",
        active: "#b1a7fc",
        black: "#b7c0d8",
        white: "#e8edf9"
      },
      height: {
        "100px": "100px",
        "800px": "800px"
      },
      width: {
        "100px": "100px",
        "800px": "800px"
      }
    },
  },
  plugins: [],
}
