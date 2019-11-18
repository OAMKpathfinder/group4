const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    container: {
      center: true
    },
    fontFamily: {
      main: ['Rubik']
    },
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    },
    colors: {
      primary: colors.green,
      white: colors.white,
      gray: colors.gray,
      red: colors.red
    },
    extend: {}
  },
  variants: {
    spinner: ['responsive']
  },
  plugins: [
    require('autoprefixer'),
    require('tailwindcss-transition')({
      standard: 'all .2s ease-in-out',
      transitions: {
        slow: 'all 1s ease',
        'normal-in-out-quad': 'all 2s cubic-bezier(0.455, 0.03, 0.515, 0.955)',
        'slow-in-out-quad': 'all 2s cubic-bezier(0.455, 0.03, 0.515, 0.955)'
      },
      variants: ['responsive', 'hover', 'focus', 'active']
    }),
    require('tailwindcss-hyphens'),
    require('tailwindcss-spinner')(),
    require('tailwindcss-grid')({
      grids: [2, 3, 4, 5, 6, 8, 10, 12],
      gaps: {
        0: '0',
        4: '1rem',
        8: '2rem',
        '4-x': '1rem',
        '4-y': '1rem'
      },
      autoMinWidths: {
        '16': '4rem',
        '24': '6rem',
        '300px': '300px'
      },
      variants: ['responsive']
    }),
    require('tailwindcss-gradients')()
  ]
}
