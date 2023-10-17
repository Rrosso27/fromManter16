import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterViewResumenesPreventiveComponent } from './master-view-resumenes-preventive.component';

describe('MasterViewResumenesPreventiveComponent', () => {
  let component: MasterViewResumenesPreventiveComponent;
  let fixture: ComponentFixture<MasterViewResumenesPreventiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterViewResumenesPreventiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterViewResumenesPreventiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
