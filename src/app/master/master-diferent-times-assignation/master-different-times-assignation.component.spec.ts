import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterDifferentTimesAssignationComponent } from "./MasterDifferentTimesAssignationComponent";

describe('MasterDiferentTimesAssignationComponent', () => {
  let component: MasterDifferentTimesAssignationComponent;
  let fixture: ComponentFixture<MasterDifferentTimesAssignationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterDifferentTimesAssignationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterDifferentTimesAssignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
