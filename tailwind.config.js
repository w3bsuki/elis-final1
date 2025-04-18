/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
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
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        playfair: ["var(--font-playfair)", "serif"],
        handwriting: ["var(--font-caveat)", "'Caveat'", "'Kalam'", "'Architects Daughter'", "'Comic Neue'", "cursive"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        ripple: {
          '0%': { transform: 'scale(0) translateZ(0)', opacity: '0.6' },
          '100%': { transform: 'scale(4) translateZ(0)', opacity: '0' },
        },
        glow: {
          '0%': { boxShadow: '0 0 0 0 rgba(var(--primary-rgb), 0.4)' },
          '70%': { boxShadow: '0 0 0 10px rgba(var(--primary-rgb), 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(var(--primary-rgb), 0)' },
        },
        shine: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        'text-shimmer': {
          '0%': { backgroundPosition: '100%' },
          '100%': { backgroundPosition: '0%' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.8', transform: 'translateZ(0)' },
          '50%': { opacity: '0.4', transform: 'translateZ(0)' }
        },
        'pulse-slower': {
          '0%, 100%': { opacity: '0.7', transform: 'translateZ(0)' },
          '50%': { opacity: '0.3', transform: 'translateZ(0)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0) translateZ(0)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg) translateZ(0)' }
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0) rotate(0) translateZ(0)' },
          '50%': { transform: 'translateY(-10px) rotate(-5deg) translateZ(0)' }
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg) translateZ(0)' },
          '100%': { transform: 'rotate(360deg) translateZ(0)' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "ripple": "ripple 0.7s linear forwards",
        "glow": "glow 2s infinite",
        "shine": "shine 3s ease infinite",
        "text-shimmer": "text-shimmer 2.5s ease-out infinite alternate",
        "pulse-slow": "pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-slower": "pulse-slower 5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float-slow 7s ease-in-out infinite",
        "spin-slow": "spin-slow 20s linear infinite",
      },
      animationDelay: {
        '500': '500ms',
        '1000': '1000ms',
        '1500': '1500ms',
        '2000': '2000ms',
        '2500': '2500ms',
        '3000': '3000ms',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              color: 'hsl(var(--primary))',
              '&:hover': {
                color: 'hsl(var(--primary) / 0.8)',
              },
            },
            h1: {
              fontWeight: '700',
            },
            h2: {
              fontWeight: '600',
            },
            h3: {
              fontWeight: '600',
            },
            blockquote: {
              borderLeftColor: 'hsl(var(--primary) / 0.5)',
              backgroundColor: 'hsl(var(--muted) / 0.1)',
              fontStyle: 'normal',
            },
            'blockquote p:first-of-type::before': {
              content: 'none',
            },
            'blockquote p:last-of-type::after': {
              content: 'none',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar')({ nocompatible: true }),
    function({ addUtilities, theme, variants }) {
      const animationDelays = theme('animationDelay', {})
      const utilities = Object.entries(animationDelays).map(([key, value]) => {
        return {
          [`.animation-delay-${key}`]: { animationDelay: value },
        }
      })
      addUtilities(utilities, variants('animationDelay'))
    },
  ],
} 