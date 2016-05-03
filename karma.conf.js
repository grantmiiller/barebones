// Karma configuration
// Generated on Thu Dec 19 2013 15:26:22 GMT+0800 (SGT)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',


    // frameworks to use
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      // Old backbone tests
      './test/javascript/spec/**/*-test.js',
      // New react tests
      './app/assets/web/js/app/**/*-spec.js*'
    ],


    /**
     * The actual tests are preprocessed by the karma-webpack plugin, so that
     * their source can be properly transpiled.
     */
    preprocessors: {
      './test/javascript/spec/**/*-test.js': ['webpack', 'sourcemap'],
      './app/assets/web/js/app/**/*-spec.js*': ['webpack', 'sourcemap']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress', 'coverage'],


    coverageReporter: {
      type: 'html',
      dir: './coverage/',
      instrumenterOptions: {
        istanbul: { noCompact: true }
      }
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_ERROR,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: ['Chrome'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    webpack: require('./webpack.test.config'),

    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    },


    /**
     * Turn off verbose logging of webpack compilation.
     */
    webpackMiddleware: {
      noInfo: true
    },


    singleRun: true,


    /**
     * Array of plugins used
     */
    plugins: [
      require('karma-webpack'),
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-sourcemap-loader'),
      require('karma-coverage')
    ]

  });
};
