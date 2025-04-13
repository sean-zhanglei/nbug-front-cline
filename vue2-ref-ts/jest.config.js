module.exports = {
  preset: 'ts-jest',
  testMatch: [
    '**/__tests__/**/*.spec.[jt]s',
    '**/*.spec.[jt]s'
  ],
  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.js$': 'babel-jest',
    '^.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coverageReporters: ['html', 'text-summary']
}
