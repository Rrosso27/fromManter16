import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterViewPdfTechnicianComponent } from './master-view-pdf-technician.component';

describe('MasterViewPdfTechnicianComponent', () => {
  let component: MasterViewPdfTechnicianComponent;
  let fixture: ComponentFixture<MasterViewPdfTechnicianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterViewPdfTechnicianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterViewPdfTechnicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
