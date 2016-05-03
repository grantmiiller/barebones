
var webpack = require('webpack');
var CompressionPlugin = require('compression-webpack-plugin');
var path = require('path');
var glob = require('glob');
var autoprefixer = require('autoprefixer');

module.exports = function makeWebpackConfig(options) {
  var BUILD = options && options.build;
  var config = {module:{}};

  var fileLoader = {
    // Add any file extension that you want to get copied to your output
    loader: 'file',
    test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/
  };

  var jsLoader = {
    test: /\.(js|jsx)$/,
    loader: 'babel-loader',

    exclude: [
      path.resolve(__dirname, 'node_modules')
    ],

    query: {
      presets: ['es2015-webpack', 'react'],
      cacheDirectory: true
    }
  };

  var cssLoader = {
    test: /\.(scss|css)$/,
    loaders: [
      'style',
      'css?modules&importLoaders=1&localIdentName=[name]___[local]___[hash:base64:5]!postcss-loader',
      'sass',
    ],
    include: [
      path.resolve('./app/assets/scss'),
      path.resolve('./app/assets/js/app')
    ],
  };

  var eslintLoader = {
    test: /\.jsx?$/,
    loader: 'eslint-loader',
    include: [
      path.resolve(__dirname, './app/assets/js')
    ]
  };

  config.postcss = [autoprefixer];

  config.resolve = {
    // Webpack needs to know where to look when resolving required files.
    modules: [
      path.resolve('./app/assets/scss'),
      path.resolve('./app/assets/js'),
      'node_modules'
    ]
  };

  config.entry = {
    // Core bundle for the react app which is included on all pages.
    core: './app/assets/js/index.js',
  };

  config.output = {
    path: __dirname + '/public/assets',
    // Output path from the view of the page
    // Uses webpack-dev-server in development
    publicPath: BUILD ? '/assets/' : 'http://localhost:8080/assets/',

    // Filename for entry points
    filename: '[name].bundle.js',

    // Filename for non-entry points
    // Only adds hash in build mode
    // GM: Used if putting out specific chunks, we probably won't have to do this
    chunkFilename: BUILD ? '[name].[hash].js' : '[name].bundle.js'
  };

  config.plugins = [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false // Suppress uglification warnings
      }
    }),

    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
  ];

  if (BUILD) {
    // For the build, we compress the assets in place.
    config.plugins.push(new CompressionPlugin({
      asset: '[file]',
      algorithm: 'gzip',
      test: /\.bundle.js$|\.css$/,
      threshold: 10240,
      minRatio: 0.8
    }))
  }

  if (BUILD) config.devtool = 'source-map';
  else config.devtool = 'eval';

  config.module.preLoaders = [eslintLoader];
  
  config.module.loaders = [fileLoader, cssLoader, jsLoader];

  config.devServer = {
    contentBase: './public',
    stats: {
      modules: true,
      cached: false,
      colors: true,
      chunk: false
    }
  };

  return config;
};
