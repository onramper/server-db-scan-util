module.exports = {
  tables: [
    {
      TableName: "test-table",
      KeySchema: [
        { AttributeName: "PK", KeyType: "HASH" },
        { AttributeName: "SK", KeyType: "RANGE" },
      ],
      AttributeDefinitions: [
        { AttributeName: "PK", AttributeType: "S" },
        { AttributeName: "SK", AttributeType: "S" },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
      data: [
        {
          PK: "user#1",
          SK: "metadata",
          name: "John Doe",
        },
        {
          PK: "user#2",
          SK: "metadata",
          name: "Vera Summers",
        },
        {
          PK: "user#3",
          SK: "metadata",
          name: "Elliot Alderson",
        },
        {
          PK: "item#1",
          SK: "details",
          cost: 5,
        },
        {
          PK: "item#2",
          SK: "details",
          cost: 8,
        },
      ],
    },
  ],
  basePort: 8000,
};
