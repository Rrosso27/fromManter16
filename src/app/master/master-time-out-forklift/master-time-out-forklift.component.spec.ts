import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterTimeOutForkliftComponent } from './master-time-out-forklift.component';

describe('MasterTimeOutForkliftComponent', () => {
  let component: MasterTimeOutForkliftComponent;
  let fixture: ComponentFixture<MasterTimeOutForkliftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterTimeOutForkliftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterTimeOutForkliftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
