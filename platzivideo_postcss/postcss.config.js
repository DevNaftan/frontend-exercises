module.exports = {
  plugins: [
    require('postcss-import')({
      plugins: [
        require('stylelint')
      ]
    }),
    require('postcss-font-magician')({
      variants: {
        'Open Sans': {
          '400': [],
          '700': []
        }
      }
    }),
    require('postcss-cssnext')({
      features: {
        customProperties: false,
        calc: false 
      }
    }),
    require('css-mqpacker'),
    require('cssnano')
  ]
}