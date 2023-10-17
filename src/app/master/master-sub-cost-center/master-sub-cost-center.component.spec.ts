import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterSubCostCenterComponent } from './master-sub-cost-center.component';

describe('MasterSubCostCenterComponent', () => {
  let component: MasterSubCostCenterComponent;
  let fixture: ComponentFixture<MasterSubCostCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterSubCostCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterSubCostCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
