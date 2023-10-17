import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterUserRegisterComponent } from './master-user-register.component';

describe('MasterUserRegisterComponent', () => {
  let component: MasterUserRegisterComponent;
  let fixture: ComponentFixture<MasterUserRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterUserRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterUserRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
