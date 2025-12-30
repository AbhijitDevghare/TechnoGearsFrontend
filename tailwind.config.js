/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        primary: '#1e40af', // Custom blue for electronics
        secondary: '#10b981', // Custom green
        accent: '#f59e0b', // Amber for highlights
        neutral: '#3d4451',
        'base-100': '#ffffff',
        info: '#3abff8',
        success: '#36d399',
        warning: '#fbbf24',
        error: '#f87272',
        tertiary: '#8b5cf6', // Purple for additional accents
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'tech': '0 4px 6px -1px rgba(30, 64, 175, 0.1), 0 2px 4px -1px rgba(30, 64, 175, 0.06)',
        'glow': '0 0 20px rgba(30, 64, 175, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fade-in 0.5s ease-in-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-tech': 'linear-gradient(135deg, #1e40af, #10b981)',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        technogears: {
          "primary": "#1e40af",
          "secondary": "#10b981",
          "accent": "#f59e0b",
          "neutral": "#3d4451",
          "base-100": "#ffffff",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbf24",
          "error": "#f87272",
          "tertiary": "#8b5cf6",
        },
      },
      "light",
      "dark",
    ],
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
    themeRoot: ":root",
  },
};
// // // 