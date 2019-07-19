module.exports = {
  reporters: [
    'default',
    [
      'jest-junit',
      {
        output: '../report/yavnotifier-junit.xml'
      }
    ]
  ],
  testResultsProcessor: 'jest-sonar-reporter',
  collectCoverage: false,
  collectCoverageFrom: ['src/*.ts'],
  coverageReporters: ['lcov', 'text'],
  coverageDirectory: '../report/coverage/jest',
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0
    }
  },
  transform: {
    '^.+\\.ts$': 'ts-jest'
  }
};
