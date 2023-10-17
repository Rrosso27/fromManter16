import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterResumenesComponent } from './master-resumenes.component';

describe('MasterResumenesComponent', () => {
  let component: MasterResumenesComponent;
  let fixture: ComponentFixture<MasterResumenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterResumenesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterResumenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
