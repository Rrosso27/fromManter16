import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterBatteryMaintenanceComponent } from './master-battery-maintenance.component';

describe('MasterBatteryMaintenanceComponent', () => {
  let component: MasterBatteryMaintenanceComponent;
  let fixture: ComponentFixture<MasterBatteryMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterBatteryMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterBatteryMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
