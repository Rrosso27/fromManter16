import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterBrandComponent } from './master-brand.component';

describe('MasterBrandComponent', () => {
  let component: MasterBrandComponent;
  let fixture: ComponentFixture<MasterBrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterBrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
