/** Используемые цвета */
export const COLORS = {
  blue: '#009bff',
  boldPencil: '#505050',
  darkBlue: '#000aff',
  orange: '#f44336',
  pencil: '#737373',
};

/** Размер одной клетки */
export const CELL_SIZE = 60;

export enum SupportedFunctions {
  'linear' = 0,
  'parabole',
  'hyperbole',
}

export type SupportedFunction = keyof typeof SupportedFunctions;
