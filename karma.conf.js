module.exports = function(config) {
  config.set({
    frameworks: [ 
      'jasmine',
      'browserify',
    ],
    plugins: [
      'karma-browserify',
      'karma-jasmine',
      'karma-firefox-launcher',
      'karma-chrome-launcher',
//      'karma-edge-launcher'
    ],
    files: [
      './test/compiled/**/*.js'
    ],
    exclude: [
      "**/*.ts",
      "./node_modules"
    ],
    preprocessors: {
      './test/compiled/**/*.js': [ 'browserify' ]
    },
    browserify: {
      debug: false,
    },
    reporters: [ 'progress' ],
    browsers: [ 
//      'Edge', 
      'Firefox',
      'Chrome', ],
    port: 9876,
    singleRun: true,

    logLevel: config.LOG_INFO,
  })
}
