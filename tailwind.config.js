/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors")

module.exports = {
  content: ["./tadpole/**/*.{html,js,vue}", "./tadpole/*.{html,js,vue}"],
  important: true,
  theme: {
    colors: {},
    extend: {},
    backgroundColor: (theme) => ({
      ...colors,
      darkBg: "rgba(30,30,34,0.8);"
    }),
    textColor: (theme) => ({
      ...colors,
      darkText: "#9b9baa",
      comText: "#00323c"
    })
  },
  darkMode: "media",
  plugins: []
}
