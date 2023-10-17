import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterReportHorometerComponent } from './master-report-horometer.component';

describe('MasterReportHorometerComponent', () => {
  let component: MasterReportHorometerComponent;
  let fixture: ComponentFixture<MasterReportHorometerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterReportHorometerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterReportHorometerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
