import { TestBed, inject } from '@angular/core/testing';

import { ForkliftService } from './forklift.service';

describe('ForkliftService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ForkliftService]
    });
  });

  it('should be created', inject([ForkliftService], (service: ForkliftService) => {
    expect(service).toBeTruthy();
  }));
});
