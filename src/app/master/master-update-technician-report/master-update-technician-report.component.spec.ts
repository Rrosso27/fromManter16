import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterUpdateTechnicianReportComponent } from './master-update-technician-report.component';

describe('MasterUpdateTechnicianReportComponent', () => {
  let component: MasterUpdateTechnicianReportComponent;
  let fixture: ComponentFixture<MasterUpdateTechnicianReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterUpdateTechnicianReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterUpdateTechnicianReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
