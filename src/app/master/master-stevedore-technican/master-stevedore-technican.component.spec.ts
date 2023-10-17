import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterStevedoreTechnicanComponent } from './master-stevedore-technican.component';

describe('MasterStevedoreTechnicanComponent', () => {
  let component: MasterStevedoreTechnicanComponent;
  let fixture: ComponentFixture<MasterStevedoreTechnicanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterStevedoreTechnicanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterStevedoreTechnicanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
