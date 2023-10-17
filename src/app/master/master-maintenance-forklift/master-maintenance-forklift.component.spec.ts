import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterMaintenanceForkliftComponent } from './master-maintenance-forklift.component';

describe('MasterMaintenanceForkliftComponent', () => {
  let component: MasterMaintenanceForkliftComponent;
  let fixture: ComponentFixture<MasterMaintenanceForkliftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterMaintenanceForkliftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterMaintenanceForkliftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
