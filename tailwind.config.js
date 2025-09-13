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
        // Neutres
        neutral: {
          50:  '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          600: '#475569',
          800: '#0F172A',
          900: '#0B1220',
        },
        // Sémantiques
        brand: '#0EA5E9',   // BLEU = pro/tech/business
        trust: '#22C55E',   // VERT = gratuité/confiance/individuel
        danger: '#EF4444',
      },
      borderRadius: { '2xl': '1.25rem' },
      boxShadow: { glow: '0 0 40px rgba(14,165,233,.25)' },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [],
};
