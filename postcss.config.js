module.exports = () => ({
  // Prevent warning from postcss source-map
  from: undefined,
  plugins: [
    require('autoprefixer')({
      browsers: '> 0.1%',
    }),
  ]
})
