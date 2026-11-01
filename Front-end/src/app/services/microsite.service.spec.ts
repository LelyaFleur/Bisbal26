import { TestBed } from '@angular/core/testing';

import { MicrositeService } from './microsite.service';

describe('MicrositeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MicrositeService = TestBed.get(MicrositeService);
    expect(service).toBeTruthy();
  });
});
