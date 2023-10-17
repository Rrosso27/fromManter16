import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterCustomersComponent } from './master-customers.component';

describe('MasterCustomersComponent', () => {
  let component: MasterCustomersComponent;
  let fixture: ComponentFixture<MasterCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterCustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
