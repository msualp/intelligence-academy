/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Converting CSS variables to Tailwind colors
        'primary-blue': '#003366',
        'secondary-blue': '#0051A2',
        'light-blue': '#E6F2FF',
        'accent-orange': '#FF6B35',
        'primary-gray': '#1A1A1A',
        'secondary-gray': '#666666',
        'light-gray': '#F5F5F5',
        'gradient-start': '#1E3A8A',
        'gradient-mid': '#6B46C1',
        'gradient-end': '#DC2626'
      },
      fontFamily: {
        'sans': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      animation: {
        'gradient': 'gradient 8s ease infinite',
        'float': 'float 20s infinite ease-in-out',
        'float-delayed': 'float 20s infinite ease-in-out 5s',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '1' }
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}