// See: https://jestjs.io/docs/getting-started#using-typescript
export default {
  testRegex: "(.*\\.test\\.(tsx?|jsx?))$",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "babel-jest",
  },
  preset: "jest-dynalite",
  setupFilesAfterEnv: ["jest-extended/all"], // https://github.com/jest-community/jest-extended
};
