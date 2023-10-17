import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterMaintenanceAsingFinishComponent } from './master-maintenance-asing-finish.component';

describe('MasterMaintenanceAsingFinishComponent', () => {
  let component: MasterMaintenanceAsingFinishComponent;
  let fixture: ComponentFixture<MasterMaintenanceAsingFinishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterMaintenanceAsingFinishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterMaintenanceAsingFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
