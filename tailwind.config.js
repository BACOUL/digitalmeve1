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
      colors: {
        dm: {
          bg: '#0B1220',
          surface: '#0F172A',
          text: '#E5EDF9',
          muted: '#C8D3E6',
          border: 'rgba(255,255,255,.12)',
          sky: '#0EA5E9',     // CTA principal
          emerald: '#22C55E', // Confiance
          danger: '#EF4444',  // Erreur
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Sora', 'Inter', 'ui-sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      borderRadius: { '2xl': '1.25rem' },
      boxShadow: { glow: '0 0 40px rgba(14,165,233,0.35)' },
    },
  },
  plugins: [],
};
