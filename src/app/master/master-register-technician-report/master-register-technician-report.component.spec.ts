import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterRegisterTechnicianReportComponent } from './master-register-technician-report.component';

describe('MasterRegisterTechnicianReportComponent', () => {
  let component: MasterRegisterTechnicianReportComponent;
  let fixture: ComponentFixture<MasterRegisterTechnicianReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterRegisterTechnicianReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterRegisterTechnicianReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
