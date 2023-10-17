import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterUpdateSettlementCustomerComponent } from './master-update-settlement-customer.component';

describe('MasterUpdateSettlementCustomerComponent', () => {
  let component: MasterUpdateSettlementCustomerComponent;
  let fixture: ComponentFixture<MasterUpdateSettlementCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterUpdateSettlementCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterUpdateSettlementCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
