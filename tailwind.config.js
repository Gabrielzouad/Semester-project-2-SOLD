/** @type {import('tailwindcss').Config} 
 
*/
module.exports = {
  content: ["./src/**/*.{html,js}", "./index.html", "./signIn.html", "./signUp.html", "./shop.html", "./productpage.html"],
  theme: {
    extend: {},
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui"), require("@tailwindcss/aspect-ratio")],
};
