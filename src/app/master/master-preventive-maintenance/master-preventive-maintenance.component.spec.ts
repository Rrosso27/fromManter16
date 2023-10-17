import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterPreventiveMaintenanceComponent } from './master-preventive-maintenance.component';

describe('MasterPreventiveMaintenanceComponent', () => {
  let component: MasterPreventiveMaintenanceComponent;
  let fixture: ComponentFixture<MasterPreventiveMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterPreventiveMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterPreventiveMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
