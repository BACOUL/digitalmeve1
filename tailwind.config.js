/** @type {import('tailwindcss').Config} */
module.exports = {
  // V1 = light-only ; on peut laisser 'class' (aucun dark style ne sera utilisé)
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
          bg: '#0B1220',
          surface: '#111827',
          text: '#E5E7EB',
          emerald: '#20C997',
          sky: '#0EA5E9',
          accent: '#22D3EE',
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
