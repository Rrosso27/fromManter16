import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterResetPasswordLoginComponent } from './master-reset-password-login.component';

describe('MasterResetPasswordLoginComponent', () => {
  let component: MasterResetPasswordLoginComponent;
  let fixture: ComponentFixture<MasterResetPasswordLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterResetPasswordLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterResetPasswordLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
