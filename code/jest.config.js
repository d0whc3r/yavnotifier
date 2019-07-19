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
  collectCoverage: true,
  collectCoverageFrom: ['src/*.ts'],
  coverageReporters: ['lcov', 'text', 'json'],
  coverageDirectory: '../report/coverage/jest',
  transform: {
    '^.+\\.ts$': 'ts-jest'
  }
};
