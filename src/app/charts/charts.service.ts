import { Injectable } from '@angular/core';

@Injectable()
export class ChartsService {

  /** Используемые цвета */
  COLORS = {
    darkBlue: '#000aff',
    blue: '#009bff',
    boldPencil: '#505050',
    pencil: '#737373',
  };

  /** Размер одной клетки */
  cellSize = 50;

  /** Количество клеток для 1. */
  scale = 2;

  constructor() { }

}
