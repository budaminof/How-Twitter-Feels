module.exports = {
  entry: './src/index.js',
  output: {
    path: './public',
    filename: 'bundle.js'
  },
  module: {
    noParse: [/\.ws$/],
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] }
    ]
  },
  node: {
    tls: "empty"
  },
  externals: ['fs','ws'],
  resolve: {
    extensions: ['.js', '.json']
  }
};
