module.exports = {
  cacheDirectory: ".jest-cache",
  coverageDirectory: ".jest-coverage",
  coveragePathIgnorePatterns: ["<rootDir>/packages/(?:.+?)/lib/", "<rootDir>/web/", "<rootDir>/electron/", "<rootDir>/storybook/"],
  coverageReporters: ["html", "text"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  setupFilesAfterEnv: [`<rootDir>/jest.setup.js`],
  testPathIgnorePatterns: ["<rootDir>/packages/(?:.+?)/lib/", "<rootDir>/web/", "<rootDir>/electron/", "<rootDir>/storybook/"],
};
