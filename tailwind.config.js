/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/views/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {
        primaryExtraLight: "#cce6ff",
        primaryLight: "#88c4ff",
        primaryL: "#44a2ff",
        primary: "#0080ff",
        primaryD: "#05a",
        primaryDark: "#048",

        secondary: '#ff5b16',
        
        sdgOrange: "#e9432f",
        sdgYellow: '#f59c2d',
        sdgGreen: "#4c9e39",
      },
      gridTemplateRows: {
        "auto": "80px 1fr",
        "rowauto": "auto 1fr"
      },
    },
  },
  plugins: [],
}
