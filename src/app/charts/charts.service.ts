import { Injectable } from '@angular/core';

@Injectable()
export class ChartsService {

  /** Используемые цвета */
  COLORS = {
    blue: '#009bff',
    boldPencil: '#505050',
    darkBlue: '#000aff',
    orange: '#f44336',
    pencil: '#737373',
  };

  /** Размер одной клетки */
  cellSize = 50;

  constructor() { }

}
