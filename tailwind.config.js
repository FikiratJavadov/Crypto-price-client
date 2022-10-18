/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial-dark":
          "radial-gradient(78.18% 288.23% at -19.27% -180.08%,#41a6e1 0%,#1a1a1a 95.72%)",
        "gradient-radial-light":
          "radial-gradient(78.18% 288.23% at -19.27% -180.08%,#41a6e1 0%,#FFFFFF 95.72%)",
      },
    },
  },
  plugins: [],
};
