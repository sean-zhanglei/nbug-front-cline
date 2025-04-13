module.exports = {
  testMatch: [
    '**/__tests__/**/*.spec.js',
    '**/*.spec.js'
  ],
  // testRegex: 'HelloWorld.spec.js',
  moduleFileExtensions: ['js', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.js$': 'babel-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coverageReporters: ['html', 'text-summary']
}
