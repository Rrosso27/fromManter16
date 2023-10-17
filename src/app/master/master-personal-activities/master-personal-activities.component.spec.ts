import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterPersonalActivitiesComponent } from './master-personal-activities.component';

describe('MasterPersonalActivitiesComponent', () => {
  let component: MasterPersonalActivitiesComponent;
  let fixture: ComponentFixture<MasterPersonalActivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterPersonalActivitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterPersonalActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
