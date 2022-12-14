import { unmarshall } from "@aws-sdk/util-dynamodb";
import { DocumentClient, Key } from "aws-sdk/clients/dynamodb";
import dynamodb from "./dynamodb";
import { writeToCurrentLine } from "./log";
import { computeTimeLeft } from "./progress";

// A max string length to avoid long PKs from polluting the console.
const maxPkLengthInLog = 20;

export async function doSynchronousScan(
  scanParams: DocumentClient.ScanInput,
  totalNumberOfItems?: number
) {
  let items: any = [];
  let lastItemEvaluated: undefined | Key = undefined;

  let accCount = 0; // Count of items that have passed the filter.
  let accScannedCount = 0;
  const startTime = performance.now();

  // `lastItemEvaluated === undefined` because when the final scan request is done, and there are no items left to be
  // scanned, then the lastItemEvaluated in the response of the last scan will be set to undefined. This means we can
  // use this to determine when we've scanned all items, which in turns means we can stop the while loop.
  while (
    (lastItemEvaluated !== undefined && accScannedCount > 0) ||
    (lastItemEvaluated === undefined && accScannedCount === 0)
  ) {
    await dynamodb
      .scan({
        ...scanParams,
        ExclusiveStartKey: lastItemEvaluated as any,
      })
      .then((res) => {
        items.push(...(res.Items ?? []));
        accCount += res.Count ?? 0;
        accScannedCount += res.ScannedCount ?? 0;
        if (totalNumberOfItems) {
          const percentageDone = Math.round(
            (accScannedCount / totalNumberOfItems) * 100
          );

          const timeLeftInSeconds = computeTimeLeft(
            startTime,
            accScannedCount,
            totalNumberOfItems
          );

          const pkOfLastEvaluatedKey = res.LastEvaluatedKey?.PK.S;
          const pkOfLastEvaluatedKeyTruncated =
            pkOfLastEvaluatedKey &&
            pkOfLastEvaluatedKey.length > maxPkLengthInLog
              ? pkOfLastEvaluatedKey?.slice(0, maxPkLengthInLog - 1)
              : pkOfLastEvaluatedKey;
          writeToCurrentLine(
            `${percentageDone}%, ETA ${timeLeftInSeconds}s [${accCount} | ${accScannedCount}], ${pkOfLastEvaluatedKeyTruncated}`
          );
        } else {
          writeToCurrentLine(
            `[${accCount} | ${accScannedCount}], ${res.LastEvaluatedKey?.PK}`
          );
        }
        lastItemEvaluated = res.LastEvaluatedKey;
      });
  }
  // Write a new line to move the cursor to the next line. Else logs will be written to the progress line left by the
  // `writeToCurrentLine` function calls above.
  process.stdout.write("\n");

  // Unmarshall all items; effectively transforming the AWS formatted objects into plain objects.
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/modules/_aws_sdk_util_dynamodb.html
  for (let i = 0; i < items.length; i++) {
    items[i] = unmarshall(items[i]);
  }

  return items;
}
