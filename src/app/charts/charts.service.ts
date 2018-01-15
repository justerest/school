import { Injectable } from '@angular/core';

@Injectable()
export class ChartsService {

  COLORS = {
    darkBlue: '#000aff',
    blue: '#009bff',
    boldPencil: '#505050',
    pencil: '#737373',
  };

  cellSize = 50;
  scale = 2;

  constructor() { }

}
