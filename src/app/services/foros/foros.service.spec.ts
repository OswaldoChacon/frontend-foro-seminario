import { TestBed } from '@angular/core/testing';

import { ForosService } from './foros.service';

describe('ForosService', () => {
  let service: ForosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
