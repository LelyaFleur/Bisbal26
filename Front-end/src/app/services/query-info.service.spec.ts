import { TestBed } from '@angular/core/testing';

import { QueryInfoService } from './query-info.service';

describe('QueryInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QueryInfoService = TestBed.get(QueryInfoService);
    expect(service).toBeTruthy();
  });
});
