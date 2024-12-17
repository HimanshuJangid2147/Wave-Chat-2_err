// tailwind.config.js
// eslint-disable-next-line no-undef
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // Make sure your paths are correct
  ],
  theme: {
    extend: {
      animation: {
        wave1: 'waveMovement 8s linear infinite', // Faster wave
        wave2: 'waveMovement 12s linear infinite', // Slower wave
      },
      keyframes: {
        waveMovement: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      fontFamily: {
        jura: ['Jura', 'sans-serif'],
        kanit: ['Kanit', 'sans-serif'],
        museo: ['MuseoModerno', 'cursive'],
        redhat: ['"Red Hat Display"', 'sans-serif'],
    },
    },
  },
  plugins: [],
};
