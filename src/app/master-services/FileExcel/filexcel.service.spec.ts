import { TestBed, inject } from '@angular/core/testing';

import { FilexcelService } from './filexcel.service';

describe('FilexcelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilexcelService]
    });
  });

  it('should be created', inject([FilexcelService], (service: FilexcelService) => {
    expect(service).toBeTruthy();
  }));
});
