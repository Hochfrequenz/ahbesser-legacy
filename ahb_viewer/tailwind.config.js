/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        primary: '#7AAB8A',   // HF primary color
        secondary: '#669580', // HF shadow color
        accent: '#E94C74',    // HF accent color 1
      },
      fontFamily: {
        'sans': ['Yanone Kaffeesatz', 'sans-serif'], // For Yanone Kaffeesatz
        'condensed': ['Roboto Condensed', 'sans-serif'], // For Roboto Condensed
      }
    },
  },
  plugins: [],
}

