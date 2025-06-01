/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    // Gradient backgrounds
    'from-blue-600',
    'via-purple-600', 
    'to-indigo-800',
    'from-red-50',
    'to-orange-50',
    'from-green-50',
    'to-emerald-50',
    'bg-gradient-to-br',
    // Text colors
    'text-white',
    'text-gray-800',
    // Background utilities
    'bg-white/10',
    'backdrop-blur-sm',
  ]
} 