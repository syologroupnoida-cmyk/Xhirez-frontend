
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // Cover all possible React file extensions
    './pages/**/*.{html,js,jsx,ts,tsx}', // Include any pages directory
    './components/**/*.{html,js,jsx,ts,tsx}', // Include any components directory
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#4A90E2',
        'primary-blue-dark': '#3A7BD5',
        'secondary-teal': '#50E3C2',
        'text-dark-gray': '#4A4A4A',
        'bg-light-gray': '#F0F2F5',
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX 0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [

    require("tailwind-scrollbar-hide"), 
  ],
};




