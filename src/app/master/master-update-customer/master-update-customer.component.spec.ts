import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterUpdateCustomerComponent } from './master-update-customer.component';

describe('MasterUpdateCustomerComponent', () => {
  let component: MasterUpdateCustomerComponent;
  let fixture: ComponentFixture<MasterUpdateCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterUpdateCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterUpdateCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
