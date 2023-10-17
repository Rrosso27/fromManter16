import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterRegisterModuleComponent } from './master-register-module.component';

describe('MasterRegisterModuleComponent', () => {
  let component: MasterRegisterModuleComponent;
  let fixture: ComponentFixture<MasterRegisterModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterRegisterModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterRegisterModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
