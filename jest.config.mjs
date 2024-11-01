export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/**/*.test.ts'],
  setupFilesAfterEnv: ['<rootDir>/setup-jest.js'],
  coveragePathIgnorePatterns: ['dist/'],
  coverageReporters: ['json-summary', 'text', 'lcov'],
  collectCoverage: true
};
