import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAF8F5",
        surface: "#FFFFFF",
        "primary-dark": "#1A1A1A",
        "gold-accent": "#C9A96E",
        "text-primary": "#1A1A1A",
        "text-secondary": "#888888",
        border: "#EDE9E3",
        // Platform badge colors
        "platform-amazon": "#FF9900",
        "platform-flipkart": "#2874F0",
        "platform-myntra": "#FF3F6C",
        "platform-nykaa": "#FC2779",
        "platform-ajio": "#1A1A1A",
        "platform-meesho": "#9B2EFA",
        "platform-other": "#666666",
      },
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        body: ['"DM Sans"', "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1100px",
      },
      borderRadius: {
        card: "4px",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.5s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;
