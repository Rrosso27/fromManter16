import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterPersonalMonitoringComponent } from './master-personal-monitoring.component';

describe('MasterPersonalMonitoringComponent', () => {
  let component: MasterPersonalMonitoringComponent;
  let fixture: ComponentFixture<MasterPersonalMonitoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterPersonalMonitoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterPersonalMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
