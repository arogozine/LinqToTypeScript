module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: [ "<rootDir>" ],
  // verbose: true,
  bail: true,
  testRegex: "(/tests/.*)$",
  testMatch: null,
  // Setup File
  setupFilesAfterEnv: [ "./initialize.ts" ]
};