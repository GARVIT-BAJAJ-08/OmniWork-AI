/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#10243A',
          teal: '#0D9488',
          tealLight: '#14B8A6',
          mint: '#E8F8F4',
          ice: '#EFF7FC',
          bg: '#F7F9FC',
          card: '#FFFFFF',
          text: '#172B3A',
          muted: '#64748B',
          border: '#E2E8F0',
          success: '#16A34A',
          warning: '#D97706',
          error: '#DC2626',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(16, 36, 58, 0.04), 0 1px 2px 0 rgba(16, 36, 58, 0.02)',
        'card': '0 4px 6px -1px rgba(16, 36, 58, 0.05), 0 2px 4px -2px rgba(16, 36, 58, 0.03)',
        'hover': '0 10px 15px -3px rgba(16, 36, 58, 0.08), 0 4px 6px -4px rgba(16, 36, 58, 0.04)',
        'modal': '0 20px 25px -5px rgba(16, 36, 58, 0.1), 0 8px 10px -6px rgba(16, 36, 58, 0.05)',
      }
    },
  },
  plugins: [],
}
