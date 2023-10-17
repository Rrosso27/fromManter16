import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterForkliftMaintenanceComponent } from './master-forklift-maintenance.component';

describe('MasterForkliftMaintenanceComponent', () => {
  let component: MasterForkliftMaintenanceComponent;
  let fixture: ComponentFixture<MasterForkliftMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterForkliftMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterForkliftMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
