import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterPaymentConditionComponent } from './master-payment-condition.component';

describe('MasterPaymentConditionComponent', () => {
  let component: MasterPaymentConditionComponent;
  let fixture: ComponentFixture<MasterPaymentConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterPaymentConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterPaymentConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
