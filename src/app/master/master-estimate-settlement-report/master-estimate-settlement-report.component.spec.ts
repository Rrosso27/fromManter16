import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterEstimateSettlementReportComponent } from './master-estimate-settlement-report.component';

describe('MasterEstimateSettlementReportComponent', () => {
  let component: MasterEstimateSettlementReportComponent;
  let fixture: ComponentFixture<MasterEstimateSettlementReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterEstimateSettlementReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterEstimateSettlementReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
