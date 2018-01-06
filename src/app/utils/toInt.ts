/**
 * Parses a number or return 0.
 */
export function toInt(param: any) {
  const parsedNumber = parseInt(param, 10);
  return !isNaN(parsedNumber) ? parsedNumber : 0;
}
