import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterTechniciansComponent } from './master-technicians.component';

describe('MasterTechniciansComponent', () => {
  let component: MasterTechniciansComponent;
  let fixture: ComponentFixture<MasterTechniciansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterTechniciansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterTechniciansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
