import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterFuelComponent } from './master-fuel.component';

describe('MasterFuelComponent', () => {
  let component: MasterFuelComponent;
  let fixture: ComponentFixture<MasterFuelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterFuelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterFuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
