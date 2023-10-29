/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      current: "currentColor",
      transparent: "transparent",
      red: "#FF2E00",
      orange: "#F81",
      "pastel-orange": "#FFCC70",
      peach: "#FFFADD",
      green: "#63A54B",
      "ocean-blue": "#22668D",
      "sky-blue": "#8ECDDD",
      black: "#000",
      "orange-black": "#322F2D",
      "dark-gray": "#919EA8",
      gray: "#F0F0F0",
      white: "#FFF",
    },
    fontFamily: {
      serif: ["Young Serif", "Chonburi", "serif"],
      "sans-serif": ["Gabarito", "IBM Plex Sans Thai Looped", "sans-serif"],
    },
    extend: {
      fontSize: {
        "2xs": "0.625rem",
      },
    },
  },
  plugins: [],
};
