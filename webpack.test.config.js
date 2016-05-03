
var path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  module: {
    loaders: [{
      loader: 'babel',
      test: /\.jsx?$/,
      query: {
        presets: ['airbnb']
      },
      exclude: [
        path.resolve(__dirname, './app/assets/web/vendor'),
        path.resolve(__dirname, 'node_modules')
      ]
    }],
    postLoaders: [{
      // Instrument only testing sources with Istanbul
      loader: 'istanbul-instrumenter',
      test: /\.js$/,
      exclude: [
        path.resolve(__dirname, './app/assets/web/vendor'),
        path.resolve(__dirname, 'node_modules')
      ]
    }]
  },
  externals: {
    cheerio: 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window',
    'text-encoding': 'window'
  },
  resolve: {
    modules: [
      path.resolve('./app/assets/web/js'),
      path.resolve('./app/assets/web/vendor/js'),
      path.resolve('.app/assets/admin/js'),
      'node_modules'
    ]
  }
}
