/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        body: ["Inter", "sans-serif"],
        heading: ["Outfit", "sans-serif"],
      },
      colors: {
        // Light theme: white background with black text
        light: {
          bgPrimary: "#ffffff",
          bgSecondary: "#f8f9fa",
          textPrimary: "#000000",
          textSecondary: "#333333",
          textTertiary: "#666666",
          border: "#cccccc",
        },
        // Dark theme: pure black background with pure white text (no blue tints)
        dark: {
          bgPrimary: "#000000",
          bgSecondary: "#0a0a0a",
          textPrimary: "#ffffff",
          textSecondary: "#ffffff",
          textTertiary: "#ffffff",
          border: "#1a1a1a",
        },
        // Accent colors with proper contrast
        accent: {
          light: "#000000",
          lightHover: "#1f2937",
          dark: "#ffffff",
          darkHover: "#e5e7eb",
        },
      },
      boxShadow: {
        "glass-light": "0 4px 30px rgba(0, 0, 0, 0.05)",
        "glass-dark": "0 4px 30px rgba(0, 0, 0, 0.3)",
      },

    },
  },
  plugins: [require("@tailwindcss/typography")],
};
