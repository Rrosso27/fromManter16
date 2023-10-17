import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterForgetPasswordComponent } from './master-forget-password.component';

describe('MasterForgetPasswordComponent', () => {
  let component: MasterForgetPasswordComponent;
  let fixture: ComponentFixture<MasterForgetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterForgetPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterForgetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
