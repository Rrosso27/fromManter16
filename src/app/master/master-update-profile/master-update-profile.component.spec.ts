import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterUpdateProfileComponent } from './master-update-profile.component';

describe('MasterUpdateProfileComponent', () => {
  let component: MasterUpdateProfileComponent;
  let fixture: ComponentFixture<MasterUpdateProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterUpdateProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterUpdateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
