import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterTechnicianMaintenanceComponent } from './master-technician-maintenance.component';

describe('MasterTechnicianMaintenanceComponent', () => {
  let component: MasterTechnicianMaintenanceComponent;
  let fixture: ComponentFixture<MasterTechnicianMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterTechnicianMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterTechnicianMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
