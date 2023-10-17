import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterPendingReportComponent } from './master-pending-report.component';

describe('MasterPendingReportComponent', () => {
  let component: MasterPendingReportComponent;
  let fixture: ComponentFixture<MasterPendingReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterPendingReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterPendingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
