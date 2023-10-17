import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterRegisterTechnicianForkliftReportComponent } from './master-register-technician-forklift-report.component';

describe('MasterRegisterTechnicianForkliftReportComponent', () => {
  let component: MasterRegisterTechnicianForkliftReportComponent;
  let fixture: ComponentFixture<MasterRegisterTechnicianForkliftReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterRegisterTechnicianForkliftReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterRegisterTechnicianForkliftReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
