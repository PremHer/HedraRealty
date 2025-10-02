module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  roots: ['<rootDir>/test', '<rootDir>/src'],
  testEnvironment: 'node',
  testRegex: '.*\\.e2e-spec\\.ts$',
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  setupFiles: ['dotenv/config', '<rootDir>/test/setup.ts'],
  collectCoverageFrom: ['src/**/*.ts', '!src/main.ts', '!src/**/*.module.ts', '!src/scripts/**', '!src/migrations/**'],
  coverageDirectory: './coverage',
  clearMocks: true
};
