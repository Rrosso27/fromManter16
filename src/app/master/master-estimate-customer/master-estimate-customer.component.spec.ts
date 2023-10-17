import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterEstimateCustomerComponent } from './master-estimate-customer.component';

describe('MasterEstimateCustomerComponent', () => {
  let component: MasterEstimateCustomerComponent;
  let fixture: ComponentFixture<MasterEstimateCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterEstimateCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterEstimateCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
