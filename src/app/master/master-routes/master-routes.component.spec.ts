import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterRoutesComponent } from './master-routes.component';

describe('MasterRoutesComponent', () => {
  let component: MasterRoutesComponent;
  let fixture: ComponentFixture<MasterRoutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterRoutesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
