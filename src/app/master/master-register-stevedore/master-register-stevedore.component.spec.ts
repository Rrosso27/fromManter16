import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterRegisterStevedoreComponent } from './master-register-stevedore.component';

describe('MasterRegisterStevedoreComponent', () => {
  let component: MasterRegisterStevedoreComponent;
  let fixture: ComponentFixture<MasterRegisterStevedoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterRegisterStevedoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterRegisterStevedoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
