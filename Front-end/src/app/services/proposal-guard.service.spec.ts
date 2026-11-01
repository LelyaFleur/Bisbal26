import { TestBed } from '@angular/core/testing';

import { ProposalGuard} from './proposal-guard.service';

describe('ProposalGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProposalGuard = TestBed.get(ProposalGuard);
    expect(service).toBeTruthy();
  });
});
