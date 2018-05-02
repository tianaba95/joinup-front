import { TestBed, inject } from '@angular/core/testing';

import { WantoguideService } from './wantoguide.service';

describe('WantoguideService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WantoguideService]
    });
  });

  it('should be created', inject([WantoguideService], (service: WantoguideService) => {
    expect(service).toBeTruthy();
  }));
});
