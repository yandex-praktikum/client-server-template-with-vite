import dotenv from 'dotenv';

dotenv.config();

export default {
  moduleNameMapper: {
    '.*\\.scss$': '<rootDir>/scssStub.js',
    '^[./a-zA-Z0-9$_-]+\\.png$': '<rootDir>/src/__mocks__/fileMock.js'
  },
  roots: ['<rootDir>/src'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
};
