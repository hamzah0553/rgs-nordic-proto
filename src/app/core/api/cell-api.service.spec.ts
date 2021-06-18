import { TestBed } from '@angular/core/testing';

import { CellApiService } from './cell-api.service';

describe('CellApiService', () => {
  let service: CellApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CellApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
