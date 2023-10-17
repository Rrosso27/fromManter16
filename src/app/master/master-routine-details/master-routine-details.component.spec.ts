import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterRoutineDetailsComponent } from './master-routine-details.component';

describe('MasterRoutineDetailsComponent', () => {
  let component: MasterRoutineDetailsComponent;
  let fixture: ComponentFixture<MasterRoutineDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterRoutineDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterRoutineDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
