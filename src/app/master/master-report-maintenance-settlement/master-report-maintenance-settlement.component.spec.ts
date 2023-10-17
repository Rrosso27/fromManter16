import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterReportMaintenanceSettlementComponent } from './master-report-maintenance-settlement.component';

describe('MasterReportMaintenanceSettlementComponent', () => {
  let component: MasterReportMaintenanceSettlementComponent;
  let fixture: ComponentFixture<MasterReportMaintenanceSettlementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterReportMaintenanceSettlementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterReportMaintenanceSettlementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
