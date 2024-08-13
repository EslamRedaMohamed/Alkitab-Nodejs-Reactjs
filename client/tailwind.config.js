/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#F5F7F8", // light gray
        yellow: "#F4CE14", // yellow
        primary: "#45474B", // dark gray
        secondary: "#495E57", // dark green
        text: "#45474B", // dark gray
      },
    },
  },
  plugins: [],
};
