import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterCreateWarehousesOutComponent } from './master-create-warehouses-out.component';

describe('MasterCreateWarehousesOutComponent', () => {
  let component: MasterCreateWarehousesOutComponent;
  let fixture: ComponentFixture<MasterCreateWarehousesOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterCreateWarehousesOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterCreateWarehousesOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
