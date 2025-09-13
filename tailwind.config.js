/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './public/**/*.html'
  ],
  theme: {
    extend: {
      borderRadius: { '2xl': '1.25rem' },
      boxShadow: { glow: '0 0 40px rgba(34,211,238,0.35)' },
      colors: {
        dm: {
          bg: '#0B1220',        // fond principal
          surface: '#111827',   // cartes, sections
          text: '#E5EDF9',      // texte principal
          textMuted: '#C8D3E6', // texte secondaire
          sky: '#0EA5E9',       // bleu = CTA / pro / technique
          emerald: '#22C55E',   // vert = confiance / gratuité
          danger: '#EF4444',    // rouge = erreurs
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
