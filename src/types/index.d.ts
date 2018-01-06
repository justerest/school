declare type Params<T, K extends keyof T = never, D extends keyof T = never> = (
  {[P in K]: T[P]} &
  {[P in keyof T]?: T[P]} &
  {[P in D]?: undefined }
);

declare type BinBool = 0 | 1;
