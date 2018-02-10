export enum KeyCodes {
  enter = 13,
  left = 37,
  up,
  right,
  down,
}

export type AvailableKeyCodes = keyof typeof KeyCodes;

export function isInKeyCodes(keyCode: any) {
  return Boolean(KeyCodes[keyCode]);
}
