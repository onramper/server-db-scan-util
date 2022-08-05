import {
  DescribeTableCommand,
  DescribeTableInput,
  DynamoDBClient,
  GetItemCommand,
  GetItemInput,
  ScanCommand,
  ScanInput,
} from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: "eu-central-1",
});

// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/index.html
export default {
  get: async (params: GetItemInput) =>
    await client.send(new GetItemCommand(params)),
  scan: async (params: ScanInput) =>
    await client.send(new ScanCommand(params)),
  describeTable: async (params: DescribeTableInput) =>
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/describetablecommand.html
    await client.send(new DescribeTableCommand(params)),
};
