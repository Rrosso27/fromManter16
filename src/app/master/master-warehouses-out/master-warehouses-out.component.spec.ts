import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterWarehousesOutComponent } from './master-warehouses-out.component';

describe('MasterWarehousesOutComponent', () => {
  let component: MasterWarehousesOutComponent;
  let fixture: ComponentFixture<MasterWarehousesOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterWarehousesOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterWarehousesOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
