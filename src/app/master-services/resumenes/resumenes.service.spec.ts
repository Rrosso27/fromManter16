import { TestBed, inject } from '@angular/core/testing';

import { ResumenesService } from './resumenes.service';

describe('ResumeneService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResumenesService]
    });
  });

  it('should be created', inject([ResumenesService], (service: ResumenesService) => {
    expect(service).toBeTruthy();
  }));
});
