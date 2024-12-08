/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-main": "#5194F9",
        "primary-text": "#FFFFFF",
        "primary-disabled": "#A1A1A1",
        "primary-disabled-text": "#FFFFFF",
        "primary-paper": "#F6FAFF",

        "secondary-main": "#DFE3EA",
        "secondary-text": "#525252",

        "border-grey": "#DEDEDE",
        error: "#FF3321",
      },
    },
  },
  plugins: [],
};
