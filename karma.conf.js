module.exports = function(config) {
  config.set({
    frameworks: [ 
      'jasmine', 
      'karma-typescript'
    ],
    plugins: [
      'karma-typescript',
      'karma-jasmine',
      'karma-edge-launcher',
      'karma-firefox-launcher'
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
    browsers: [ 'Edge', 'Firefox' ],
    port: 9876,
    singleRun: true,
  })
}
