<h1 align="center">
  <br>
  DynamoDB Scan and CSV Export Utility
  <br>
</h1>
<h4 align="center">
  A simple utility that allows for synchronous filtered scans on DynamoDB
</h4>
<p align="center">
  <a href="#introduction">Introduction</a> •
  <a href="#purpose">Purpose</a> •
  <a href="#instructions">Instructions</a> •
  <a href="#troubleshooting">Troubleshooting</a> •
  <a href="#license">License</a>
</p>

## Introduction
A simple utility that allows for synchronous filtered scans of DynamoDB tables. The scan parameters can be configured (in `index.ts`) to filter the results as desired.

## Purpose
There are scenarios in which you'd like to export a filtered set of records from DynamoDB. There can be use cases in which your DynamoDB schema doesn't support direct querying of the desired records (because the full PK is unknown), thus either a GSI has to be added or a scan should be performed. The AWS web console allows these scans to be performed but doesn't allow for easy exporting of a large number of records. This utility aims to fill this gap.

## Instructions
1. `yarn install` to install the dependencies. (Use Node v16)
2. Adjust the configuration in `index.ts` as you see fit.
3. `yarn start` to retrieve the items from DynamoDB and to then save the items to a csv file in the `out` folder.

## Troubleshooting
* If you run into `SyntaxError: Unexpected reserved word` when running the utility, then make sure you have Node v16 set up, some versions of Node v14 can cause this error.

## License
This utility is licensed under the [MIT license](LICENSE.md).
