export enum SupportedFunctions {
  'linear' = 0,
  'parabole',
  'hyperbole',
}

export type SupportedFunction = keyof typeof SupportedFunctions;
