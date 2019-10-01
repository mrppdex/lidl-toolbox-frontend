import { TestBed } from '@angular/core/testing';

import { PluService } from './plu.service';

describe('PluService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PluService = TestBed.get(PluService);
    expect(service).toBeTruthy();
  });
});
