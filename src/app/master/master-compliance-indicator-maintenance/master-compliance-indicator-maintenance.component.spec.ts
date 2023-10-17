import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterComplianceIndicatorMaintenanceComponent } from './master-compliance-indicator-maintenance.component';

describe('MasterComplianceIndicatorMaintenanceComponent', () => {
  let component: MasterComplianceIndicatorMaintenanceComponent;
  let fixture: ComponentFixture<MasterComplianceIndicatorMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterComplianceIndicatorMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterComplianceIndicatorMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
