import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterSupportRegisterComponent } from './master-support-register.component';

describe('MasterSupportRegisterComponent', () => {
  let component: MasterSupportRegisterComponent;
  let fixture: ComponentFixture<MasterSupportRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterSupportRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterSupportRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
