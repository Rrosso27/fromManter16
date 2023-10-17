import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterChecklistMaintenanceComponent } from './master-checklist-maintenance.component';

describe('MasterChecklistMaintenanceComponent', () => {
  let component: MasterChecklistMaintenanceComponent;
  let fixture: ComponentFixture<MasterChecklistMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterChecklistMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterChecklistMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
