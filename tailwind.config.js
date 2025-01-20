/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        keyframes: {
          'slide-in': {
            'from': { transform: 'translateX(-100%)' },
            'to': { transform: 'translateX(0)' },
          },
          'slide-fwd': {
            '0%': { transform: 'translateZ(0px)' },
            '100%': { transform: 'translateZ(160px)' },
          },
        },
        animation: {
          'slide-in': 'slide-in 0.5s ease-out',
          'slide-fwd': 'slide-fwd 0.45s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        },
      },
    },
    plugins: [],
  }