import dynamodb from "./dynamodb";

/**
 * Retrieves the total number of items in the specified DynamoDB table.
 *
 * The count is included in the table's metadata which is retrieved through the DescribeTable DynamoDB SDK command. See:
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/describetablecommand.html
 *
 * @param tableName The name of the DynamoDB table.
 * @returns The number of items in the table. E.g.: 100.
 */
export async function getDatabaseTableItemCount(tableName: string) {
  const response = await dynamodb.describeTable({
    TableName: tableName,
  });
  return response.Table?.ItemCount;
}
