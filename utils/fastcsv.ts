import * as fs from 'fs';
import * as fastcsv from 'fast-csv';
import { writeToCurrentLine } from './log';

export function writeDataToCsv(data: fastcsv.FormatterRow[], csvName: string, numberOfItems: number) {
    writeToCurrentLine('Starting to write items to csv...');

    // From: https://stackabuse.com/reading-and-writing-csv-files-with-node-js/#usingthefastcsvmodule
    const ws = fs.createWriteStream(csvName);
    fastcsv
      .write(data, { headers: true })
      .pipe(ws);
      writeToCurrentLine(`Finished writing ${numberOfItems} records to '${csvName}'.\n`);
  }