import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterMaintenanceDurationComponent } from './master-maintenance-duration.component';

describe('MasterMaintenanceDurationComponent', () => {
  let component: MasterMaintenanceDurationComponent;
  let fixture: ComponentFixture<MasterMaintenanceDurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterMaintenanceDurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterMaintenanceDurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
