/**
 * Will write to the current line in the console, effectively allowing you to overwrite the current line printed. This
 * can be useful for printing progress messages (E.g.: 10% or ETA: 5s).
 *
 * Note: if the text is too long to fit in the terminal window, then the text will glitch and leak to the next line.
 * Using a proper library for this would resolve this issue.
 * @param text The text to print to the console.
 */
export function writeToCurrentLine(text: string) {
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.stdout.write(text);
}
