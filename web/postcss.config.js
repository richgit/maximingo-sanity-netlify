module.exports = () => ({
  loader: 'postcss-loader',
  options: {
    plugins: () => [require('autoprefixer')]
  },
  plugins: [
    require('postcss-import'),
    require('postcss-preset-env')({
      stage: 0
    })
  ]
})
