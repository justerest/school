/** Parses a int or return 0. */
export function toInt(param: string) {
  const parsedNumber = parseInt(param, 10);
  return !isNaN(parsedNumber) ? parsedNumber : 0;
}
