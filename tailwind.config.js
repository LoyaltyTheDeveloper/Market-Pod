/** @type {import('tailwindcss').Config} */
import tailwindcssAnimated from "tailwindcss-animated";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        expandWidth: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
      animation: {
        "expand-width": "expandWidth 0.6s ease-in-out forwards",
      },
    },
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        lobster: ['Lobster', 'cursive'],
        opensans: ['Open Sans', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'], 
        lora: ['Lora', 'serif'], 
        montserrat: ['Montserrat', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        merriweather: ['Merriweather', 'serif'],
        playfair: ['Playfair Display', 'serif'],
        pacifico: ['Pacifico', 'cursive'],
        dancing: ['Dancing Script', 'cursive'],
        oswald: ['Oswald', 'sans-serif'],
        fira: ['Fira Code', 'monospace'],
        source: ['Source Code Pro', 'monospace'],
        bitter: ['Bitter', 'serif'],
      },
    },
  },
  plugins: [tailwindcssAnimated],
}

