/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f2eceb",
        separator: "rgb(0,10,20,0.1)",
        hit: "orange",
        miss: "#ce1d29",
        special: "rgba(38,36,61,.5)",
        faded: "rgba(38,36,61,.7)",
        midFaded: "rgba(38,36,61,.9)",
      },
    },
  },
  plugins: [],
};
