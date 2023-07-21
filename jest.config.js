module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },

  // Automatically clear mock calls, instances, contexts and results before every tests
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the tests
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  coveragePathIgnorePatterns: [
    "/node_modules/"
  ],

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // A set of global variables that need to be available in all tests environments
  globals: {},

  // An array of directory names to be searched recursively up from the requiring module's location
  moduleDirectories: [
    "node_modules"
  ],

  // An array of file extensions your modules use
  moduleFileExtensions: [
    "js",
    "mjs",
    "cjs",
    "jsx",
    "ts",
    "tsx",
    "json",
    "node"
  ],

  // An array of regexp pattern strings that are matched against all tests paths, matched tests are skipped
  testPathIgnorePatterns: [
    "/node_modules/"
  ],

  // The regexp pattern or array of patterns that Jest uses to detect tests files
  testRegex: "/tests/.*.test.ts$",

  "moduleNameMapper": {
    "^@engine/(.*)": "<rootDir>/src/engine/$1"
  },
};
