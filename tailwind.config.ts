import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Government Safety Status Colors
        gov: {
          safe: "hsl(var(--gov-safe))",
          caution: "hsl(var(--gov-caution))",
          danger: "hsl(var(--gov-danger))",
          info: "hsl(var(--gov-info))",
        },
        // Monitoring Glow Effects
        glow: {
          safe: "hsl(var(--glow-safe))",
          caution: "hsl(var(--glow-caution))",
          danger: "hsl(var(--glow-danger))",
          active: "hsl(var(--glow-active))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        // Government-Grade Typography
        "ibm-plex": ["IBM Plex Sans", "Inter", "system-ui", "sans-serif"],
        "command": ["Roboto Condensed", "IBM Plex Sans", "sans-serif"],
        "inter": ["Inter", "system-ui", "sans-serif"],
        "space-grotesk": ["Space Grotesk", "Inter", "sans-serif"],
        "admin": ["Space Grotesk", "Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        // Command Center Gradients
        "gradient-command": "var(--gradient-command)",
        "gradient-panel": "var(--gradient-panel)",
        "gradient-status": "var(--gradient-status)",
      },
      boxShadow: {
        // Professional Control Room Shadows
        "command": "var(--shadow-command)",
        "glow-safe": "var(--shadow-glow-safe)",
        "glow-caution": "var(--shadow-glow-caution)",
        "glow-danger": "var(--shadow-glow-danger)",
        "glow-active": "var(--shadow-glow-active)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
