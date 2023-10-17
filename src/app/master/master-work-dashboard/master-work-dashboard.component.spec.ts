import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterWorkDashboardComponent } from './master-work-dashboard.component';

describe('MasterWorkDashboardComponent', () => {
  let component: MasterWorkDashboardComponent;
  let fixture: ComponentFixture<MasterWorkDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterWorkDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterWorkDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
