const MILLISECONDS_PER_SECOND = 1_000;

/**
 * Computes the time left in seconds to finish processing the total number of items based on the time computation
 * started and on the number of items processed thus far. See the parameters for more information.
 *
 * @param timeStarted A timestamp measured in milliseconds. Uses `performance.now()` internally. See:
 * https://developer.mozilla.org/en-US/docs/Web/API/Performance/now.
 * @param currentAmount The number of items processed thus far.
 * @param totalAmount The total number of items to process.
 * @returns The estimated time left in seconds to process all items.
 */
export function computeTimeLeft(
  timeStarted: number,
  currentAmount: number,
  totalAmount: number
): number {
  const timeElapsed = (performance.now() - timeStarted) / MILLISECONDS_PER_SECOND;

  // Yes, the logic below is probably unnecessarily computionally expensive.
  const timeInSecondsPerItem = (timeElapsed / currentAmount);
  const itemsLeftToProcess = totalAmount - currentAmount;
  const timeLeftInSeconds = timeInSecondsPerItem * itemsLeftToProcess;
  return Math.trunc(timeLeftInSeconds);
}
