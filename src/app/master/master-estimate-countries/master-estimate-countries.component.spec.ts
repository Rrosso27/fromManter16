import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterEstimateCountriesComponent } from './master-estimate-countries.component';

describe('MasterEstimateCountriesComponent', () => {
  let component: MasterEstimateCountriesComponent;
  let fixture: ComponentFixture<MasterEstimateCountriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterEstimateCountriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterEstimateCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
