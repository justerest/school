/** Parses an int or returns 0. */
export function toInt(param: any) {
  const parsedNumber = parseInt(param, 10);
  return parsedNumber || 0;
}
