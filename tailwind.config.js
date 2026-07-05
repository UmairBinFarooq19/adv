/** @type {import('tailwindcss').Config} */

// ─────────────────────────────────────────────────────────────────────────────
// AdventuresKashmir — Global Design System
// A single source of truth for color, type, spacing, radius, shadow and motion.
// Every component derives its look from these tokens (no magic values in JSX),
// so re-theming the whole site later means editing this one file.
// ─────────────────────────────────────────────────────────────────────────────

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    // Container: centered, generous side gutters that grow with the viewport.
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
      },
      screens: {
        '2xl': '1360px', // cap line length even on ultra-wide screens
      },
    },

    // Responsive breakpoints (mobile-first). `xs` added for small-phone tuning.
    screens: {
      xs: '400px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },

    extend: {
      colors: {
        // Brand dark — Himalayan pine forests. Used for headers, footers, ink.
        pine: {
          50: '#EEF4F1',
          100: '#D5E4DD',
          200: '#ABC9BC',
          300: '#7BA795',
          400: '#4E8471',
          500: '#2F6555',
          600: '#1F4E42',
          700: '#193E35',
          800: '#14322B',
          900: '#0F2620',
          950: '#081712',
        },
        // Accent — Kashmiri saffron. Warmth + luxury without terracotta cliché.
        saffron: {
          50: '#FDF6EA',
          100: '#FAE9C8',
          200: '#F4D18C',
          300: '#EEB856',
          400: '#E8A33D',
          500: '#D9862A',
          600: '#B96A20',
          700: '#94501C',
          800: '#78411C',
          900: '#653819',
          950: '#3A1D0B',
        },
        // Secondary — glacier / Dal Lake blues. Cool counterpoint to saffron.
        glacier: {
          50: '#EEF5F7',
          100: '#D3E6EB',
          200: '#A6CBD6',
          300: '#72A9B9',
          400: '#4A8598',
          500: '#356B7D',
          600: '#2A5666',
          700: '#254654',
          800: '#223B47',
          900: '#1F323C',
          950: '#121F26',
        },
        // Neutrals — cool "snow" surface + green-tinted "ink" text.
        snow: '#F5F8F6',
        ink: '#0C1A15',

        // Semantic aliases wired to CSS variables (see styles/index.css).
        // These let components say bg-surface / text-body without knowing the hex.
        background: 'rgb(var(--color-background) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        body: 'rgb(var(--color-body) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        line: 'rgb(var(--color-line) / <alpha-value>)',
      },

      fontFamily: {
        // Display: characterful optical serif, used with restraint on headings.
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        // Body / UI: modern humanist sans.
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },

      fontSize: {
        // Fluid display sizes so the hero scales smoothly phone → desktop.
        'display-sm': ['clamp(2rem, 5vw, 2.75rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(2.5rem, 6vw, 4rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(3rem, 8vw, 5.5rem)', { lineHeight: '1.02', letterSpacing: '-0.025em' }],
        // Small tracked-out eyebrow label.
        eyebrow: ['0.8125rem', { lineHeight: '1', letterSpacing: '0.18em' }],
      },

      // Spacing scale extensions for large, editorial section rhythm.
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem',
        section: 'clamp(4.5rem, 9vw, 8rem)', // vertical padding between sections
      },

      borderRadius: {
        xl2: '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      },

      boxShadow: {
        // Soft, diffuse shadows — premium, never harsh.
        soft: '0 2px 8px -2px rgb(12 26 21 / 0.08), 0 8px 24px -8px rgb(12 26 21 / 0.10)',
        lift: '0 8px 30px -6px rgb(12 26 21 / 0.14), 0 20px 60px -20px rgb(12 26 21 / 0.18)',
        glass: '0 1px 0 0 rgb(255 255 255 / 0.25) inset, 0 8px 32px -8px rgb(12 26 21 / 0.24)',
      },

      backgroundImage: {
        'gradient-pine': 'linear-gradient(160deg, #14322B 0%, #0F2620 55%, #081712 100%)',
        'gradient-glow': 'radial-gradient(60% 60% at 50% 0%, rgba(232,163,61,0.16) 0%, rgba(232,163,61,0) 70%)',
      },

      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)', // gentle, expensive-feeling ease-out
      },

      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'drift': {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both',
        drift: 'drift 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
