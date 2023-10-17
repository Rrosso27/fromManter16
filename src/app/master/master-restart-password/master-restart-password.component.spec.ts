import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterRestartPasswordComponent } from './master-restart-password.component';

describe('MasterRestartPasswordComponent', () => {
  let component: MasterRestartPasswordComponent;
  let fixture: ComponentFixture<MasterRestartPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterRestartPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterRestartPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
