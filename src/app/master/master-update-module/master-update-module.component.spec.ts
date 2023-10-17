import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterUpdateModuleComponent } from './master-update-module.component';

describe('MasterUpdateModuleComponent', () => {
  let component: MasterUpdateModuleComponent;
  let fixture: ComponentFixture<MasterUpdateModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterUpdateModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterUpdateModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
