import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  coverageDirectory: 'coverage',
  collectCoverage: true,
  testPathIgnorePatterns: ['/node_modules'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testMatch: ['<rootDir>/src/**/__test__/*.ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/__test__/*.ts?(x)',
    '!**/node_modules/**',
  ],
  transformIgnorePatterns: [
    '/node_modules/(?!@sokritha-sabaicode/ms-libs|@tsoa/cli|yaml)', // Adjust this line
  ],
  coverageThreshold: {
    global: {
      branches: 1, // conditional
      functions: 1, // how many defined functions are called during test
      lines: 1, // lines of code execute in the test
      statements: 1,
    },
  },
  coverageReporters: ['text-summary', 'lcov'],
  moduleNameMapper: {
    '@/(.*)': ['<rootDir>/$1'],
  },
};

export default config;