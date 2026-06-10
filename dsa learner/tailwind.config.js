/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          bg: '#f8fafc',
          surface: '#ffffff',
          border: '#e2e8f0',
        },
        brand: {
          purple: '#7c3aed',
          cyan: '#0284c7',
        },
        status: {
          success: '#10b981',
          error: '#ef4444',
          warning: '#eab308'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace']
      }
    },
  },
  plugins: [],
}
