/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Professional color palette
        primary: "#2563EB",        // Professional blue
        secondary: "#1E40AF",      // Darker blue
        accent: "#059669",         // Professional teal
        
        // Legacy support (updated)
        lightGreen: "#059669",     // Professional teal
        darkGreen: "#047857",      // Darker teal
        
        // Backgrounds
        lightBackground: "#FFFFFF", // Pure white
        darkBackground: "#111827", // Dark gray
        
        // Text colors
        darkBlack: "#111827",      // Dark gray
        grayColor: "#6B7280",      // Neutral gray
        
        // Accent colors
        yellowColor: "#D97706",    // Professional amber
        
        // Gradient combinations
        gradientFrom: "#2563EB",   // Professional blue
        gradientTo: "#059669",     // Professional teal
        
        // Success/Error states
        success: "#059669",        // Teal
        error: "#DC2626",          // Red
        warning: "#D97706",        // Amber
        
        // Additional professional colors
        slate: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
        },
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      fontFamily: {
        'display': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
  darkMode: 'class',
};