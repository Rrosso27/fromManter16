import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterRegisterPlatformsComponent } from './master-register-platforms.component';

describe('MasterRegisterPlatformsComponent', () => {
  let component: MasterRegisterPlatformsComponent;
  let fixture: ComponentFixture<MasterRegisterPlatformsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterRegisterPlatformsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterRegisterPlatformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
