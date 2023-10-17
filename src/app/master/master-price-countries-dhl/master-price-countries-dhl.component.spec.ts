import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterPriceCountriesDhlComponent } from './master-price-countries-dhl.component';

describe('MasterPriceCountriesDhlComponent', () => {
  let component: MasterPriceCountriesDhlComponent;
  let fixture: ComponentFixture<MasterPriceCountriesDhlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterPriceCountriesDhlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterPriceCountriesDhlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
