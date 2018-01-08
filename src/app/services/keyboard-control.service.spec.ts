import { TestBed, inject } from '@angular/core/testing';

import { KeyboardControlService } from './keyboard-control.service';

describe('KeyboardControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KeyboardControlService],
    });
  });

  it('should be created', inject([KeyboardControlService], (service: KeyboardControlService) => {
    expect(service).toBeTruthy();
  }));
});
