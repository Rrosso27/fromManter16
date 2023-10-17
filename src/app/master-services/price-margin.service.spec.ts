import { TestBed, inject } from '@angular/core/testing';

import { PriceMarginService } from './price-margin.service';

describe('PriceMarginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PriceMarginService]
    });
  });

  it('should be created', inject([PriceMarginService], (service: PriceMarginService) => {
    expect(service).toBeTruthy();
  }));
});
