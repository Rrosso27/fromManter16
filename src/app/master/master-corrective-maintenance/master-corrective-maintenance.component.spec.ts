import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterCorrectiveMaintenanceComponent } from './master-corrective-maintenance.component';

describe('MasterCorrectiveMaintenanceComponent', () => {
  let component: MasterCorrectiveMaintenanceComponent;
  let fixture: ComponentFixture<MasterCorrectiveMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterCorrectiveMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterCorrectiveMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
