import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterUpdateEstimateCustomerComponent } from './master-update-estimate-customer.component';

describe('MasterUpdateEstimateCustomerComponent', () => {
  let component: MasterUpdateEstimateCustomerComponent;
  let fixture: ComponentFixture<MasterUpdateEstimateCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterUpdateEstimateCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterUpdateEstimateCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
