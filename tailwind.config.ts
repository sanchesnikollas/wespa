import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/sections/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ============================================
      // WESPA Design Tokens
      // Low-fi wireframe uses grayscale; these tokens
      // will be replaced with brand colors later
      // ============================================
      colors: {
        // Grayscale for wireframes
        wire: {
          white: '#FFFFFF',
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          black: '#0A0A0A',
        },
        // WESPA Brand Colors (Official Palette)
        wespa: {
          // Reds
          red: '#ef4136',
          'red-dark': '#d51a11',
          'red-darker': '#bd170f',
          // Grays
          gray: '#4b4b55',
          'gray-dark': '#3c3c46',
          'gray-darker': '#27272d',
        },
        brand: {
          primary: '#ef4136',
          secondary: '#4b4b55',
          dark: '#27272d',
          accent: '#d51a11',
        },
        // Semantic colors
        success: '#22C55E',
        error: '#EF4444',
        warning: '#F59E0B',
        info: '#3B82F6',
      },
      fontFamily: {
        // Primary sans-serif for body text
        sans: ['var(--font-source-sans)', 'system-ui', 'sans-serif'],
        // Elegant serif for headings and display
        serif: ['var(--font-lora)', 'Georgia', 'serif'],
        display: ['var(--font-lora)', 'Georgia', 'serif'],
        // Fallback to original D-DIN if needed
        'brand': ['"D-DIN"', 'system-ui', 'sans-serif'],
        condensed: ['"D-DIN Condensed"', 'system-ui', 'sans-serif'],
        expanded: ['"D-DIN Exp"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Typography scale
        'display-xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'display-sm': ['2.25rem', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'heading-xl': ['1.875rem', { lineHeight: '1.3' }],
        'heading-lg': ['1.5rem', { lineHeight: '1.4' }],
        'heading-md': ['1.25rem', { lineHeight: '1.4' }],
        'heading-sm': ['1.125rem', { lineHeight: '1.5' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body-md': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        'caption': ['0.75rem', { lineHeight: '1.4' }],
      },
      spacing: {
        // Consistent spacing scale
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        'section': '6rem',
        'section-lg': '8rem',
      },
      borderRadius: {
        'card': '0.75rem',
        'button': '0.5rem',
        'input': '0.375rem',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'elevated': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      // Grid configurations for different sections
      gridTemplateColumns: {
        'features': 'repeat(3, 1fr)',
        'cards': 'repeat(auto-fill, minmax(320px, 1fr))',
        'locations': 'repeat(2, 1fr)',
      },
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1440px',
    },
  },
  plugins: [],
}

export default config
