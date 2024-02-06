/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.html',
    './src/**/*.js',
    './src/**/*.jsx',
    './src/**/*.ts',
    './src/**/*.tsx',
    './public/index.html',
  ],
  theme: {
    extend: {},
    colors: {
      'athens_gray': '#e1e3e8',
      'blue_marguerite': '#8470c0',
      'meteorite': '#3a1d7b',
      'camelot': '#912b63',
    }
  },
  plugins: [],
}

