import { TestBed } from '@angular/core/testing';

import { HorarioJuradoService } from './horario-jurado.service';

describe('HorarioJuradoService', () => {
  let service: HorarioJuradoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorarioJuradoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
