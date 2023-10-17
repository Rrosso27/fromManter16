import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterMaintenanceSystemComponent } from './master-maintenance-system.component';

describe('MasterMaintenanceSystemComponent', () => {
  let component: MasterMaintenanceSystemComponent;
  let fixture: ComponentFixture<MasterMaintenanceSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterMaintenanceSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterMaintenanceSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
