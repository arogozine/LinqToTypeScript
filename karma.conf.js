module.exports = function(config) {
  config.set({
    frameworks: [ 
      'jasmine',
      'karma-typescript'
    ],
    plugins: [
      'karma-typescript',
      'karma-jasmine',
//      'karma-edge-launcher',
      'karma-firefox-launcher',
      'karma-chrome-launcher'
    ],
    files: [
      './src/*.ts',
      './test/*.ts'
    ],
    exclude: [
      "**/*.d.ts", 
      "**/*.js",
      "./node_modules"
    ],
    preprocessors: {
      '**/*.ts': ['karma-typescript']
    },
    karmaTypescriptConfig: {
      tsconfig: "./test/tsconfig.json",
    },
    reporters: [ 'progress', 'karma-typescript' ],
    browsers: [ 
      // 'Edge', 
      'Firefox',
      'Chrome', ],
    port: 9876,
    singleRun: true,

    logLevel: config.LOG_INFO,
  })
}
