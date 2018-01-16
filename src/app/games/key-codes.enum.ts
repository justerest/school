export enum KeyCodes {
  enter = 13,
  left = 37,
  up,
  right,
  down,
}

export function isInKeyCodes(keyCode: string | number) {
  return Boolean(KeyCodes[keyCode]);
}
