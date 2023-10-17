import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterMaintenanceSystemReportComponent } from './master-maintenance-system-report.component';

describe('MasterMaintenanceSystemReportComponent', () => {
  let component: MasterMaintenanceSystemReportComponent;
  let fixture: ComponentFixture<MasterMaintenanceSystemReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterMaintenanceSystemReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterMaintenanceSystemReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
