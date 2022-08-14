import {
  DescribeTableCommand,
  DescribeTableInput,
  DynamoDBClient,
  GetItemCommand,
  GetItemInput,
  ScanCommand,
  ScanInput,
} from "@aws-sdk/client-dynamodb";

const REGION = "eu-central-1";

const client = new DynamoDBClient({
  region: REGION,
  // See: https://github.com/freshollie/jest-dynalite#update-your-sourcecode
  ...(process.env.MOCK_DYNAMODB_ENDPOINT && {
    endpoint: process.env.MOCK_DYNAMODB_ENDPOINT,
    sslEnabled: false,
    region: "local",
  }),
});

// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/index.html
export default {
  get: async (params: GetItemInput) =>
    await client.send(new GetItemCommand(params)),
  scan: async (params: ScanInput) => await client.send(new ScanCommand(params)),
  describeTable: async (params: DescribeTableInput) =>
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/describetablecommand.html
    await client.send(new DescribeTableCommand(params)),
};
