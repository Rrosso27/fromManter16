import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterTechnicianReportComponent } from './master-technician-report.component';

describe('MasterTechnicianReportComponent', () => {
  let component: MasterTechnicianReportComponent;
  let fixture: ComponentFixture<MasterTechnicianReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterTechnicianReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterTechnicianReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
