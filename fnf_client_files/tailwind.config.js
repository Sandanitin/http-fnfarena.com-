/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sansita: ["Sansita", "sans-serif"],
        sansitaOne: ["Sansita One", "sans-serif"],
        comic: ["Comic Neue", "cursive"],
        architect: ["Architects Daughter", "cursive"],
        lato: ["Lato", "sans-serif"],
        josefin: ["Josefin Sans", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
  
      },

      // ⭐ ADD THESE
        keyframes: {
    spinCard: {
      "0%": { transform: "rotate(0deg)" },
      "100%": { transform: "rotate(360deg)" },
    },
  },
  animation: {
    spinCard: "spinCard 6s linear infinite",
  },

    },
  },
  plugins: [],
}
