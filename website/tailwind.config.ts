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
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        "surface-elevated": "var(--color-surface-elevated)",
        "primary-dark": "var(--color-primary-dark)",
        "gold-accent": "var(--color-gold-accent)",
        "gold-accent-hover": "var(--color-gold-accent-hover)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        border: "var(--color-border)",
        "border-light": "var(--color-border-light)",
        "section-alt": "var(--color-section-alt)",
        "section-darker": "var(--color-section-darker)",
        "gold-glow": "var(--color-gold-glow)",
        "gold-glow-strong": "var(--color-gold-glow-strong)",
        // Platform badge colors (kept as static — these are brand-specific)
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
        "content-wide": "1440px",
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
