import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterViewResumenesCorrectiveComponent } from './master-view-resumenes-corrective.component';

describe('MasterViewResumenesCorrectiveComponent', () => {
  let component: MasterViewResumenesCorrectiveComponent;
  let fixture: ComponentFixture<MasterViewResumenesCorrectiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterViewResumenesCorrectiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterViewResumenesCorrectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
