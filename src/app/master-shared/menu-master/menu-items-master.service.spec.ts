import { TestBed, inject } from '@angular/core/testing';

import { MenuItemsMasterService } from './menu-items-master.service';

describe('MenuItemsMasterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenuItemsMasterService]
    });
  });

  it('should be created', inject([MenuItemsMasterService], (service: MenuItemsMasterService) => {
    expect(service).toBeTruthy();
  }));
});
