module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {    
      colors: {
      "primary": "#94F59B",
      "secondary": "#46754A",
      "tertiary": "#6DB571"
    }},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
