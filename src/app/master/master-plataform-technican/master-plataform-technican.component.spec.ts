import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterPlataformTechnicanComponent } from './master-plataform-technican.component';

describe('MasterPlataformTechnicanComponent', () => {
  let component: MasterPlataformTechnicanComponent;
  let fixture: ComponentFixture<MasterPlataformTechnicanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterPlataformTechnicanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterPlataformTechnicanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
