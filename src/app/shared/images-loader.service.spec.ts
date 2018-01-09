import { TestBed, inject } from '@angular/core/testing';

import { ImagesLoaderService } from './images-loader.service';

describe('ImagesLoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImagesLoaderService],
    });
  });

  it('should be created', inject([ImagesLoaderService], (service: ImagesLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
