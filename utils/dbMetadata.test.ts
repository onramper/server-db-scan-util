import { getDatabaseTableItemCount } from "./dbMetadata";

// Mock the writeToCurrentLine function as Jest doesn't support the direct invocation of `process.stdout` functions when
// using multiple workers.
jest.mock("./log", () => {
  return {
    ...jest.requireActual('./log'),
    writeToCurrentLine: jest.fn((text) => console.log(text)),
  };
});

// See `jest-dynalite-config.ts` for the local DynamoDB setup.
const TEST_TABLE_NAME = "test-table";

describe("getDatabaseTableItemCount", () => {
  test("returns correct table item count", async () => {
    const itemCount = await getDatabaseTableItemCount(TEST_TABLE_NAME);

    expect(itemCount).toBeNumber();
    // Item count can't be verified properly. This apparantly isn't updated in dynalite internally and always returns 0. See:
    // https://github.com/freshollie/jest-dynalite/issues/74 and https://github.com/mhart/dynalite/issues/102
    expect(itemCount).toBe(0); // Should be 5.
  });
});
