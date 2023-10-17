import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterSettlementCustomerComponent } from './master-settlement-customer.component';

describe('MasterSettlementCustomerComponent', () => {
  let component: MasterSettlementCustomerComponent;
  let fixture: ComponentFixture<MasterSettlementCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterSettlementCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterSettlementCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
