const tailwindcss = require('tailwindcss')

module.exports = {
  plugins: [
    require('autoprefixer')(),
    require('postcss-import')(),
    tailwindcss('./tailwind.config.js'),
    require('postcss-preset-env')({ stage: 0 })
  ]
}
