import dynamodb from "./dynamodb";

export async function getDatabaseItemCount(tableName: string) {
  const response = await dynamodb.describeTable({
    TableName: tableName,
  });
  return response.Table?.ItemCount;
}
