import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterShowForkliftComponent } from './master-show-forklift.component';

describe('MasterShowForkliftComponent', () => {
  let component: MasterShowForkliftComponent;
  let fixture: ComponentFixture<MasterShowForkliftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterShowForkliftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterShowForkliftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
