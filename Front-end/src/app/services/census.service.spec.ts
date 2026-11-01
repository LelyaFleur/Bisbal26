import { TestBed, inject } from '@angular/core/testing';

import { CensusService } from './census.service';

describe('CensusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CensusService]
    });
  });

  it('should be created', inject([CensusService], (service: CensusService) => {
    expect(service).toBeTruthy();
  }));
});
