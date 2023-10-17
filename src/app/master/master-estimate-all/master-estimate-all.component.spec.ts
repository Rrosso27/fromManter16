import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterEstimateAllComponent } from './master-estimate-all.component';

describe('MasterEstimateAllComponent', () => {
  let component: MasterEstimateAllComponent;
  let fixture: ComponentFixture<MasterEstimateAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterEstimateAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterEstimateAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
