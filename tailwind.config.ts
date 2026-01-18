import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark theme (default)
        dark: {
          bg: '#0a0a0f',
          surface: '#121218',
          border: '#1e1e24',
          text: '#e4e4e7',
          muted: '#71717a',
        },
        // Light theme
        light: {
          bg: '#ffffff',
          surface: '#f8f9fa',
          border: '#e9ecef',
          text: '#1a1a1a',
          muted: '#6c757d',
        },
        // Neon theme
        neon: {
          bg: '#050510',
          surface: '#0d0d1f',
          border: '#1a1a3e',
          primary: '#00ffff',
          secondary: '#ff00ff',
          accent: '#ffff00',
        },
        // Glass theme
        glass: {
          bg: '#0f1419',
          overlay: 'rgba(255, 255, 255, 0.05)',
          border: 'rgba(255, 255, 255, 0.1)',
        },
        // Brand colors
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(to bottom right, #0a0a0f, #1a1a2e, #16213e)',
        'gradient-neon': 'linear-gradient(to bottom right, #050510, #1a1a3e, #2d2d5f)',
        'gradient-glass': 'linear-gradient(to bottom right, #0f1419, #1a2332, #243447)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glow': '0 0 20px rgba(14, 165, 233, 0.5)',
        'neon': '0 0 30px rgba(0, 255, 255, 0.7)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-in-out',
        'scale-in': 'scaleIn 0.2s ease-in-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(14, 165, 233, 0.5)' },
          '100%': { boxShadow: '0 0 30px rgba(14, 165, 233, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
