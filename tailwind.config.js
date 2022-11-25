/** @type {import('tailwindcss').Config} 
 
*/
module.exports = {
  content: ["./src/**/*.{html,js}", "./index.html", "./signIn.html"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
