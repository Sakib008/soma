/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-bg": "#003049",
        "secondary-text": "#669bbc",
        "primary-text": "#fdf0d5",
        "button-bg": "#fdf0d5",
        "secondary-bg": "#780000",
      },
      fontFamily: {
        primary: "Poppins",
        secondary: "Lato",
      },
    },
  },
  plugins: [],
};
