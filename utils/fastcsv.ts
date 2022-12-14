import * as fs from 'fs';
import * as fastcsv from 'fast-csv';
import { writeToCurrentLine } from './log';

const CSV_OUTPUT_DIR = 'out';

export function writeDataToCsv(data: fastcsv.FormatterRow[], csvName: string, numberOfItems: number) {
    if (numberOfItems === 0) {
     writeToCurrentLine(`Skipped csv export. There are '${numberOfItems}' items to export.\n`);
     return;
    }

    writeToCurrentLine('Starting to write items to csv...');

    fs.mkdirSync(`./${CSV_OUTPUT_DIR}`, { recursive: true }); // Create data output directory if non-existent.
    // From: https://stackabuse.com/reading-and-writing-csv-files-with-node-js/#usingthefastcsvmodule
    const ws = fs.createWriteStream(`./${CSV_OUTPUT_DIR}/${csvName}`);
    fastcsv
      .write(data, { headers: true })
      .pipe(ws);
    writeToCurrentLine(`Finished writing ${numberOfItems} records to '${CSV_OUTPUT_DIR}/${csvName}'.\n`);
  }
