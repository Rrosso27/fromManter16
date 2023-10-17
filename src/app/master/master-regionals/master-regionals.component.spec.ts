import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterRegionalsComponent } from './master-regionals.component';

describe('MasterRegionalsComponent', () => {
  let component: MasterRegionalsComponent;
  let fixture: ComponentFixture<MasterRegionalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterRegionalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterRegionalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
