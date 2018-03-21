module.exports = function(config) {
  config.set({
    frameworks: [ 
      'jasmine',
      'karma-typescript',
      //'browserify',
    ],
    plugins: [
      'karma-typescript',
      'karma-jasmine',
      'karma-firefox-launcher',
      'karma-chrome-launcher',
//      'karma-edge-launcher'
    ],
    files: [
      "./src/**/*.ts",
      "./test/**/*.ts"
    ],
    exclude: [
      "./**/*.d.ts",
      "./**/IAsyncGrouping.ts",
      "./node_modules"
    ],
    preprocessors: {
      "./**/*.ts": "karma-typescript",
     // "./test/**/*.ts": "karma-typescript",
      // './test/compiled/**/*.js': [ 'browserify' ]
    },
    /*
    browserify: {
      debug: false,
    },
    */
    karmaTypescriptConfig: {
      /*
      bundlerOptions: {
          transforms: [require("karma-typescript-es6-transform")()]
      },*/
      tsconfig: "./test/tsconfig.json"
    },
    reporters: [ 'progress', 'karma-typescript' ],
    browsers: [ 
//      'Edge', 
      'Firefox',
      'Chrome', ],
    port: 9876,
    singleRun: true,

    logLevel: config.LOG_INFO,
  })
}
