import { TestBed, inject } from '@angular/core/testing';

import { HorometroService } from './horometro.service';

describe('HorometroService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HorometroService]
    });
  });

  it('should be created', inject([HorometroService], (service: HorometroService) => {
    expect(service).toBeTruthy();
  }));
});
