import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterUpdateTechnicianForkliftReportComponent } from './master-update-technician-forklift-report.component';

describe('MasterUpdateTechnicianForkliftReportComponent', () => {
  let component: MasterUpdateTechnicianForkliftReportComponent;
  let fixture: ComponentFixture<MasterUpdateTechnicianForkliftReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterUpdateTechnicianForkliftReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterUpdateTechnicianForkliftReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
