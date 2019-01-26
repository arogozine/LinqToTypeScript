module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node', // './jest-environment.js', //'jsdom', // 'node',
  roots: [ "<rootDir>/test/" ],
  testPathIgnorePatterns: ['dist'],
  verbose: true,
  // bail: true,
  testRegex: "(/test/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  testMatch: null,
  // Setup File
  setupTestFrameworkScriptFile: "./initialize.js"
};