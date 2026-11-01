import { TestBed, inject } from '@angular/core/testing';

import { VoteGuardService } from './vote-guard.service';

describe('VoteGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VoteGuardService]
    });
  });

  it('should be created', inject([VoteGuardService], (service: VoteGuardService) => {
    expect(service).toBeTruthy();
  }));
});
