import { TestBed, inject } from '@angular/core/testing';

import { StevedoreService } from './stevedore.service';

describe('StevedoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StevedoreService]
    });
  });

  it('should be created', inject([StevedoreService], (service: StevedoreService) => {
    expect(service).toBeTruthy();
  }));
});
