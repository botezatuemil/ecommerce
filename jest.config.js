module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.tsx'],
  transform: {
    "^.+\\.(ts|js)x?$": ["@swc/jest"],
   
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    '^@/(.*)': '<rootDir>/src/$1',
  },
}