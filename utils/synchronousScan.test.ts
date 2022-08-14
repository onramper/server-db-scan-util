import { doSynchronousScan } from "./synchronousScan";

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
const TEST_PARAMS = {
  ExpressionAttributeNames: {
    "#pk": "PK",
  },
  ExpressionAttributeValues: {
    ":pk_prefix": { S: "user#" },
  },
  FilterExpression: "begins_with (#pk, :pk_prefix)",
};

describe("doSynchronousScan", () => {
  test("returns items in the correct format", async () => {
    const responseItems = await doSynchronousScan({
      TableName: TEST_TABLE_NAME,
    });

    expect(responseItems.length).toBeGreaterThanOrEqual(1);
    expect(responseItems).toBeArrayOfSize(5); // A total of 5 items are defined in `jest-dynalite-config.ts`.
    // The expected format is an unmarshalled object with all its properties.
    expect(responseItems[0]).toBeObject();
    expect(responseItems[0]).toContainKeys(["PK", "SK"]);
  });

  test("filters items based on params", async () => {
    const responseItems = await doSynchronousScan({
      TableName: TEST_TABLE_NAME,
      ...TEST_PARAMS,
    });

    expect(responseItems).toBeArrayOfSize(3); // 3 users are defined in `jest-dynalite-config.ts`.
    expect(
      // Has a PK property that starts with the prefix used in the scan filter.
      responseItems[0][TEST_PARAMS.ExpressionAttributeNames["#pk"]]
    ).toStartWith(TEST_PARAMS.ExpressionAttributeValues[":pk_prefix"].S);
  });
});
