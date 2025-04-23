/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightGreen: "#42A5F5",     // Bright blue for buttons (was #68B2A0)
        darkGreen: "#0288D1",      // Medium blue for accents (was #2C6975)
        lightBackground: "#E3F2FD", // Very light blue background (was #F8F8F8)
        darkBackground: "#1E3A8A", // Dark blue for contrast (was #22262D)
        darkBlack: "#0D1B2A",      // Dark blue-gray text (was #000000)
        grayColor: "#607D8B",      // Blue-gray for secondary elements (was #22262D)
        yellowColor: "#90CAF9",    // Soft blue (was FFE033)
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};