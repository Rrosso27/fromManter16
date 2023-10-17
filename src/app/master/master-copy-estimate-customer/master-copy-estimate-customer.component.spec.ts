import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterCopyEstimateCustomerComponent } from './master-copy-estimate-customer.component';

describe('MasterCopyEstimateCustomerComponent', () => {
  let component: MasterCopyEstimateCustomerComponent;
  let fixture: ComponentFixture<MasterCopyEstimateCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterCopyEstimateCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterCopyEstimateCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
