import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Islamic green color palette
        khair: {
          DEFAULT: '#2D8B4E', // Primary green
          50: '#F2FCE4',
          100: '#E3F6D3',
          200: '#C7EBB1',
          300: '#AAE18E',
          400: '#8ED66B',
          500: '#2D8B4E', // Primary
          600: '#246F3E',
          700: '#1B532F',
          800: '#12371F',
          900: '#091C10',
          'accent': '#FFD700', // Gold accent
          'text': '#1A4731' // Dark green text
        },
        gold: {
          DEFAULT: '#D4AF37',  // الذهبي الكلاسيكي
          50: '#FFF9E5',
          100: '#FFF3CC',
          200: '#FFEB99',
          300: '#FFE266',
          400: '#FFDA33',
          500: '#D4AF37',
          600: '#B3940F',
          700: '#927A0C',
          800: '#796408',
          900: '#5C4B06'
        },
        navy: {
          DEFAULT: '#1A2C50',  // الأزرق الغامق
          50: '#E6E9F3',
          100: '#CCD3E6',
          200: '#99A7CC',
          300: '#667AB3',
          400: '#334E99',
          500: '#1A2C50',
          600: '#152440',
          700: '#101C30',
          800: '#0A1320',
          900: '#050A10'
        },
        overlay: {
          light: 'rgba(255, 255, 255, 0.9)',
          dark: 'rgba(26, 44, 80, 0.9)'
        },
        // Add background color mapping
        background: {
          DEFAULT: 'hsl(var(--background) / <alpha-value>)',
          foreground: 'hsl(var(--foreground) / <alpha-value>)'
        },
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        card: {
          DEFAULT: 'hsl(var(--card) / <alpha-value>)',
          foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
          foreground: 'hsl(var(--popover-foreground) / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
          foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
          foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
          foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
        },
        border: 'hsl(var(--border) / <alpha-value>)',
        input: 'hsl(var(--input) / <alpha-value>)',
        ring: 'hsl(var(--ring) / <alpha-value>)',
      },
      backgroundImage: {
        'islamic-pattern': "url('/patterns/islamic-pattern.svg')",
        'gold-gradient': 'linear-gradient(135deg, #FFD700 0%, #FFC107 100%)',
        'green-gradient': 'linear-gradient(135deg, #2D8B4E 0%, #1B532F 100%)'
      },
      fontFamily: {
        sans: ['Cairo', 'sans-serif'],
      },
      boxShadow: {
        'gold-soft': '0 4px 6px rgba(212, 175, 55, 0.3)',
        'navy-deep': '0 6px 12px rgba(26, 44, 80, 0.4)',
        'overlay-light': '0 4px 6px rgba(255, 255, 255, 0.1)',
        'overlay-dark': '0 6px 12px rgba(0, 0, 0, 0.2)'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    }
  },
  plugins: [require("tailwindcss-animate")]
} satisfies Config;
