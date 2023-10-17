import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterViewResumenesChecklistComponent } from './master-view-resumenes-checklist.component';

describe('MasterViewResumenesChecklistComponent', () => {
  let component: MasterViewResumenesChecklistComponent;
  let fixture: ComponentFixture<MasterViewResumenesChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterViewResumenesChecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterViewResumenesChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
