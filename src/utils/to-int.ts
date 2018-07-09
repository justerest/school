/** Parses an int or returns 0. */
export function toInt(param: any) {
  return parseInt(param, 10) || 0;
}
