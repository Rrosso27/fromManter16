import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterCreateTechniciansComponent } from './master-create-technicians.component';

describe('MasterCreateTechniciansComponent', () => {
  let component: MasterCreateTechniciansComponent;
  let fixture: ComponentFixture<MasterCreateTechniciansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterCreateTechniciansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterCreateTechniciansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
