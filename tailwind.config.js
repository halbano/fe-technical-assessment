import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
      },
      colors: {
        // Semantic text colors for consistent design system usage
        primary: {
          DEFAULT: colors.gray[900], // Main content text
        },
        secondary: {
          DEFAULT: colors.gray[700], // Supporting text
        },
        muted: {
          DEFAULT: colors.gray[400], // Disabled/muted text
        },
      },
    },
  },
  plugins: [],
}

