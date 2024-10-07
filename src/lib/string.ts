// Copied from ui_utils.js in pdfjs-dist web directory
const InvisibleCharsRegExp = /[\x00-\x1F]/g;
export const removeNullCharacters = (str: string, replaceInvisible = false): string => {
  if (!InvisibleCharsRegExp.test(str)) {
    return str;
  }
  if (replaceInvisible) {
    return str.replaceAll(InvisibleCharsRegExp, m => (m === "\x00" ? "" : " "));
  }
  return str.replaceAll("\x00", "");
}
