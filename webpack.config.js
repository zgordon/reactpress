module.exports = {
  devtool: 'source-map',
  entry: './js/app.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ['babel-plugin-transform-decorators-legacy']
        }
      }
    ],
    noParse: /node_modules\/quill\/dist/
  },
  historyApiFallback: {
    index: '/'
  }
};
