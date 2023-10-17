import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterEstimateConfigurationComponent } from './master-estimate-configuration.component';

describe('MasterEstimateConfigurationComponent', () => {
  let component: MasterEstimateConfigurationComponent;
  let fixture: ComponentFixture<MasterEstimateConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterEstimateConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterEstimateConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
