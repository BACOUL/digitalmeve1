/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // (tu peux laisser, même si on n'utilise que light)
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './public/**/*.html',
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: { sm: '640px', md: '768px', lg: '1024px', xl: '1200px', '2xl': '1320px' },
    },
    extend: {
      borderRadius: { '2xl': '1.25rem' },
      boxShadow: {
        glow: '0 0 40px rgba(14,165,233,0.28)', // subtile, sur CTA principal
      },
      colors: {
        // Palette unifiée
        primary: {
          50:  '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#0ea5e9', // Sky (brand blue)
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        accent: {
          50:  '#ecfff9',
          100: '#cbfbea',
          200: '#98f6d9',
          300: '#5cecc3',
          400: '#2ed3a8',
          500: '#20c997', // Emerald (secondary)
          600: '#17a87f',
          700: '#138a6a',
          800: '#0f6e56',
          900: '#0b5746',
        },
        neutral: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        success: '#16a34a',
        warning: '#f59e0b',
        danger:  '#ef4444',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        // Légère rationalisation (titres plus cohérents mobile/desktop)
        'ds-hero': ['clamp(2rem, 6vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'ds-h1': ['clamp(1.75rem, 4.5vw, 2.25rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'ds-h2': ['clamp(1.5rem, 3.5vw, 1.875rem)', { lineHeight: '1.25' }],
        'ds-h3': ['1.25rem', { lineHeight: '1.35' }],
      },
    },
  },
  plugins: [],
};
