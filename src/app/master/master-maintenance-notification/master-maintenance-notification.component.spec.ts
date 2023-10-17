import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterMaintenanceNotificationComponent } from './master-maintenance-notification.component';

describe('MasterMaintenanceNotificationComponent', () => {
  let component: MasterMaintenanceNotificationComponent;
  let fixture: ComponentFixture<MasterMaintenanceNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterMaintenanceNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterMaintenanceNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
