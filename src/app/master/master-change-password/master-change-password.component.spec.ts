import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterChangePasswordComponent } from './master-change-password.component';

describe('MasterChangePasswordComponent', () => {
  let component: MasterChangePasswordComponent;
  let fixture: ComponentFixture<MasterChangePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterChangePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
