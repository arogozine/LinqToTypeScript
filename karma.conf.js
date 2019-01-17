module.exports = function(config) {
  config.set({
    frameworks: [ 
      'jasmine',
      'karma-typescript',
    ],
    plugins: [
      'karma-typescript',
      'karma-jasmine',
      'karma-firefox-launcher',
      'karma-chrome-launcher',
    ],
    files: [
      "./src/**/*.ts",
      "./test/**/*.ts"
    ],
    exclude: [
      // Karma is not made by smart people???
      "./**/*.d.ts",
      "./**/types/*.ts",
      "./node_modules",
      "./**/parallel.ts"
    ],
    preprocessors: {
      "./**/*.ts": "karma-typescript",
    },
    karmaTypescriptConfig: {
      tsconfig: "./test/tsconfig.json"
    },
    reporters: [ 'progress', 'karma-typescript' ],
    browsers: [
      'Firefox',
      'Chrome', ],
    port: 9876,
    singleRun: true,

    logLevel: config.LOG_INFO,
  })
}
