const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx,svelte}"],
  theme: {
    fontFamily: {
      sans: ["Transport", ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
};
