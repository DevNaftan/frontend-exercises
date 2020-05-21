module.exports = {
  plugins: [
    require('postcss-cssnext')({
      features: {
        customProperties: false,
        calc: false 
      }
    })
  ]
}