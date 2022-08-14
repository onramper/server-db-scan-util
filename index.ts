import { getDatabaseTableItemCount } from "./utils/dbMetadata";
import { doSynchronousScan } from "./utils/synchronousScan";
import { writeDataToCsv } from "./utils/fastcsv";

/* CONFIG */
// The region is defined in the `dynamodb.ts` file and defaults to `eu-central-1`.
const tableName = "table";

// See: https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/interfaces/scancommandinput.html
const params = {
  ExpressionAttributeNames: {
    "#pk": "PK",
  },
  ExpressionAttributeValues: {
    ":pk_prefix": {"S": "user"},
  },
  FilterExpression:
    "begins_with (#pk, :pk_prefix)",
};

/* EXECUTION */
const totalNumberOfItemsInTable = await getDatabaseTableItemCount(tableName);
const responseItems = await doSynchronousScan({ TableName: tableName, ...params }, totalNumberOfItemsInTable);

writeDataToCsv(responseItems, "list.csv", responseItems.length);
