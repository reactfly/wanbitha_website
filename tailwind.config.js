/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Rose color palette - refined with better contrast
        rose: {
          deep: '#0d0610',      // Darkest background
          noir: '#1a0c1e',      // Dark background
          dark: '#2d1333',      // Elevated background
          wine: '#4a1942',      // Card background
          mid: '#8B2252',       // Accent dark
          hot: '#d946a8',       // Primary accent
          bright: '#f472c4',    // Light accent
          soft: '#f9a8d4',      // Soft accent
          blush: '#fcd5e8',     // Very light
          pale: '#fce7f3',      // Pale
          cream: '#fdf2f8',     // Lightest
        },
        // Gold color palette - refined
        gold: {
          DEFAULT: '#fbbf24',   // Primary gold
          soft: '#fcd34d',      // Soft gold
          rose: '#f59e7b',      // Rose-gold
          dark: '#d97706',      // Dark gold
          light: '#fde68a',     // Light gold
        },
        // Lavender/Purple color palette - refined
        lavender: {
          DEFAULT: '#c084fc',   // Primary lavender
          deep: '#a855f7',      // Deep purple
          light: '#d8b4fe',     // Light lavender
          pale: '#e9d5ff',      // Pale lavender
          dark: '#7c3aed',      // Dark purple
        },
        // Mauve color
        mauve: {
          DEFAULT: '#d8b4fe',
          dark: '#a855f7',
          light: '#e9d5ff',
        },
        // Ivory color
        ivory: {
          DEFAULT: '#fef7f0',
          dark: '#f5e6d3',
        },
        // Text colors with better contrast
        text: {
          primary: 'rgba(255, 255, 255, 0.95)',
          secondary: 'rgba(255, 255, 255, 0.75)',
          tertiary: 'rgba(255, 255, 255, 0.55)',
          muted: 'rgba(255, 255, 255, 0.4)',
          faint: 'rgba(255, 255, 255, 0.25)',
        },
        // Background colors
        bg: {
          primary: '#0d0610',
          secondary: '#1a0c1e',
          tertiary: '#2d1333',
          card: 'rgba(255, 255, 255, 0.03)',
          cardHover: 'rgba(255, 255, 255, 0.05)',
        },
        // Border colors
        border: {
          primary: 'rgba(255, 255, 255, 0.08)',
          secondary: 'rgba(255, 255, 255, 0.12)',
          tertiary: 'rgba(255, 255, 255, 0.16)',
        },
        // Gradient colors
        gradient: {
          rose: 'linear-gradient(135deg, #f9a8d4, #ffffff, #c084fc)',
          gold: 'linear-gradient(135deg, #fbbf24, #ffd700, #f59e7b)',
          purple: 'linear-gradient(135deg, #c084fc, #a855f7, #d8b4fe)',
          sunset: 'linear-gradient(135deg, #f472c4, #c084fc, #fbbf24)',
          ocean: 'linear-gradient(135deg, #a855f7, #3b82f6, #06b6d4)',
        },
      },
      fontFamily: {
        display: ['"Bodoni Moda"', 'serif'],
        editorial: ['"Cormorant Garamond"', 'serif'],
        body: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        // Display sizes
        'display-xs': ['clamp(1.5rem, 4vw, 2rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(2rem, 5vw, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(2.5rem, 6vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(3rem, 8vw, 5rem)', { lineHeight: '1.05', letterSpacing: '-0.035em' }],
        'display-xl': ['clamp(4rem, 10vw, 7rem)', { lineHeight: '1', letterSpacing: '-0.04em' }],
        // Body sizes
        'body-xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.02em' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6', letterSpacing: '0.01em' }],
        'body-base': ['1rem', { lineHeight: '1.7', letterSpacing: '0' }],
        'body-lg': ['1.125rem', { lineHeight: '1.75', letterSpacing: '-0.005em' }],
        'body-xl': ['1.25rem', { lineHeight: '1.8', letterSpacing: '-0.01em' }],
        // Editorial sizes
        'editorial-sm': ['1rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
        'editorial-base': ['1.125rem', { lineHeight: '1.6', letterSpacing: '0.015em' }],
        'editorial-lg': ['1.25rem', { lineHeight: '1.65', letterSpacing: '0.02em' }],
        'editorial-xl': ['1.5rem', { lineHeight: '1.7', letterSpacing: '0.025em' }],
      },
      letterSpacing: {
        'tightest': '-0.05em',
        'tighter': '-0.04em',
        'tight': '-0.03em',
        'snug': '-0.02em',
        'normal': '0',
        'relaxed': '0.01em',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
        'ultra': '0.15em',
        'mega': '0.2em',
      },
      lineHeight: {
        'none': '1',
        'tight': '1.15',
        'snug': '1.25',
        'normal': '1.5',
        'relaxed': '1.65',
        'loose': '1.8',
        'ultra': '2',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '42': '10.5rem',
        '46': '11.5rem',
        '50': '12.5rem',
        '54': '13.5rem',
        '58': '14.5rem',
        '62': '15.5rem',
        '66': '16.5rem',
        '70': '17.5rem',
        '74': '18.5rem',
        '78': '19.5rem',
        '82': '20.5rem',
        '86': '21.5rem',
        '90': '22.5rem',
        '94': '23.5rem',
        '98': '24.5rem',
        '102': '25.5rem',
        '106': '26.5rem',
        '110': '27.5rem',
        '114': '28.5rem',
        '118': '29.5rem',
        '122': '30.5rem',
        '126': '31.5rem',
        '130': '32.5rem',
        '134': '33.5rem',
        '138': '34.5rem',
        '142': '35.5rem',
        '146': '36.5rem',
        '150': '37.5rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      boxShadow: {
        'glow-sm': '0 0 20px rgba(233, 30, 123, 0.2)',
        'glow-md': '0 0 30px rgba(233, 30, 123, 0.3)',
        'glow-lg': '0 0 40px rgba(233, 30, 123, 0.4)',
        'glow-xl': '0 0 60px rgba(233, 30, 123, 0.5)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 20px 60px rgba(0, 0, 0, 0.4)',
        'inner-glow': 'inset 0 0 20px rgba(233, 30, 123, 0.1)',
        'inner-glow-strong': 'inset 0 0 30px rgba(233, 30, 123, 0.2)',
      },
      backdropBlur: {
        'xs': '2px',
        '3xl': '32px',
        '4xl': '48px',
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'fade-up': 'fadeUp 1.2s ease forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradientMove 5s ease infinite',
        'glow': 'glowPulse 3s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 2s infinite',
        'morph': 'morph 8s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        fadeUp: {
          'from': { opacity: 0, transform: 'translateY(25px)' },
          'to': { opacity: 1, transform: 'translateY(0)' },
        },
        gradientMove: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(233, 30, 123, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(233, 30, 123, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        morph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
      },
      transitionTimingFunction: {
        'bounce-smooth': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'ease-out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'ease-in-out-circ': 'cubic-bezier(0.85, 0, 0.15, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '500': '500ms',
        '600': '600ms',
        '700': '700ms',
        '800': '800ms',
        '900': '900ms',
        '1000': '1000ms',
      },
    },
  },
  plugins: [],
}
