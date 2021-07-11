module.exports = {
  preset: "jest-playwright-preset",
  testEnvironment: "jsdom",
  moduleFileExtensions: [
    "ts",
    "js",
    "svelte"
  ],
  "testMatch": ["/**/*.e2e.js", "/**/*.e2e.ts"],
  globals: {
    "ts-jest": {
      "tsconfig": "tsconfig.json"
    }
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.svelte$": [
      "svelte-jester",
      {
        "preprocess": true,
      },
    ],
  }
}
// https://wp-kyoto.net/en/run-e2e-test-by-using-jest-and-playwright-with-typescript/