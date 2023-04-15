/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      scale: {
        102: "1.02",
      },
      colors: {
        "primary-color": "#ec161e",
        "secondary-color": "#c20000",
      },
      backgroundImage: {
        "login-background": "url('/src/img/loginBG.jpg')",
      },
    },
  },
  plugins: [],
};
