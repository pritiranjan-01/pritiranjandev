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
        // Dark theme colors — driven by CSS variables so the dim theme can override them
        dark: {
          bgPrimary:     "var(--dark-bg-primary)",
          bgSecondary:   "var(--dark-bg-secondary)",
          textPrimary:   "var(--dark-text-primary)",
          textSecondary: "var(--dark-text-secondary)",
          textTertiary:  "var(--dark-text-tertiary)",
          border:        "var(--dark-border)",
        },
        // Accent colors — also CSS-variable-driven to switch between black and Twitter blue
        accent: {
          light:     "#000000",
          lightHover: "#1f2937",
          dark:      "var(--accent-dark)",
          darkHover: "var(--accent-dark-hover)",
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
