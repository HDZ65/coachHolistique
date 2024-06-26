import type { Config } from "tailwindcss"
const { fontFamily } = require("tailwindcss/defaultTheme")

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
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
      width: {
        'short-divider': '25%', // Ajustez cette valeur selon vos besoins
      },

      fontFamily: {
        sans: ['var(--font-inter)'],
        serif: ['var(--font-alice)', 'var(--font-ephesis)', 'var(--font-montaga)'],
      },
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: {
          DEFAULT: "var(--background)",
          75: "var(--background-75)",
          50: "var(--background-50)",
          25: "var(--background-25)"
        },
        foreground: {
          DEFAULT: "var(--foreground)",
          75: "var(--foreground-75)",
          50: "var(--foreground-50)",
          25: "var(--foreground-25)"
        },
        primary: {
          DEFAULT: "var(--primary)",
          75: "var(--primary-75)",
          50: "var(--primary-50)",
          25: "var(--primary-25)",
          foreground: "var(--primary-foreground)"
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          75: "var(--secondary-75)",
          50: "var(--secondary-50)",
          25: "var(--secondary-25)",
          foreground: "var(--secondary-foreground)"
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          75: "var(--destructive-75)",
          50: "var(--destructive-50)",
          25: "var(--destructive-25)",
          foreground: "var(--destructive-foreground)"
        },
        muted: {
          DEFAULT: "var(--muted)",
          75: "var(--muted-75)",
          50: "var(--muted-50)",
          25: "var(--muted-25)",
          foreground: "var(--muted-foreground)",
          
        },
        accent: {
          DEFAULT: "var(--accent)",
          75: "var(--accent-75)",
          50: "var(--accent-50)",
          25: "var(--accent-25)",
          foreground: "var(--accent-foreground)"
        },
        popover: {
          DEFAULT: "var(--popover)",
          75: "var(--popover-75)",
          50: "var(--popover-50)",
          25: "var(--popover-25)",
          foreground: "var(--popover-foreground)"
        },
        card: {
          DEFAULT: "var(--card)",
          75: "var(--card-75)",
          50: "var(--card-50)",
          25: "var(--card-25)",
          foreground: "var(--card-foreground)"
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  
} satisfies Config

export default config