module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {    
      colors: {
      "primary": "#6DB571",
      "secondary": "#94F59B",
      "tertiary": "#46754A"
    }},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
