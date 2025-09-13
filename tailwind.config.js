/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      borderRadius: { '2xl': '1.25rem' },
      boxShadow: { glow: '0 0 40px rgba(56,189,248,0.35)' }, // bleu DM glow
      colors: {
        dm: {
          bg: '#0B1220',
          surface: '#111827',
          text: '#E5EDF9',
          textMuted: '#C8D3E6',
          accent1: '#34D399', // vert DM
          accent2: '#38BDF8', // bleu DM
          danger: '#F43F5E',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [],
};
