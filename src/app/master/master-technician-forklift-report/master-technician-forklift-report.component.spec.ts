import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterTechnicianForkliftReportComponent } from './master-technician-forklift-report.component';

describe('MasterTechnicianForkliftReportComponent', () => {
  let component: MasterTechnicianForkliftReportComponent;
  let fixture: ComponentFixture<MasterTechnicianForkliftReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterTechnicianForkliftReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterTechnicianForkliftReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
