import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterRegisterThirdComponent } from './master-register-third.component';

describe('MasterRegisterThirdComponent', () => {
  let component: MasterRegisterThirdComponent;
  let fixture: ComponentFixture<MasterRegisterThirdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterRegisterThirdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterRegisterThirdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
