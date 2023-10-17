import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterRegisterProfileComponent } from './master-register-profile.component';

describe('MasterRegisterProfileComponent', () => {
  let component: MasterRegisterProfileComponent;
  let fixture: ComponentFixture<MasterRegisterProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterRegisterProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterRegisterProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
