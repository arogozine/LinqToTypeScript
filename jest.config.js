module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node', //'jsdom', // 'node',
  roots: [ "<rootDir>/test/" ],
  testPathIgnorePatterns: ['dist'],
  verbose: true,
  // bail: true,
  testRegex: "(/test/tests/.*)$",
  testMatch: null,
  // Setup File
  setupTestFrameworkScriptFile: "./test/initialize.ts"
};