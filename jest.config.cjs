const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1', // ✅ 추가
    '^@/actions/(.*)$': '<rootDir>/actions/$1', // ✅ 추가
    '^@/types/(.*)$': '<rootDir>/types/$1', // ✅ 추가
    '^@/utils/(.*)$': '<rootDir>/utils/$1', // ✅ 추가
  },
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);
