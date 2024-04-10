/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "slide-in": "slide-in 0.5s ease-out ",
      },
      keyframes: {
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },

    },
    // colors: {
    //   transparent: 'transparent',
    //   current: 'currentColor',
    //   'grey-dark': 'rgb(23, 23, 23)',
    // },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    fontFamily: {
      display: 'Oswald, ui-serif', // Adds a new `font-display` class
    }
  
  },
  plugins: [],
};
