import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterWarehousesComponent } from './master-warehouses.component';

describe('MasterWarehousesComponent', () => {
  let component: MasterWarehousesComponent;
  let fixture: ComponentFixture<MasterWarehousesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterWarehousesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterWarehousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
