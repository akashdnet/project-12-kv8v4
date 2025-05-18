// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        'slow-rise': 'rise 10s infinite ease-in-out',
      },
      keyframes: {
        rise: {
          '0%': { transform: 'translateY(100vh) scale(1)', opacity: '0.8' },
          '100%': { transform: 'translateY(-10vh) scale(1.5)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};