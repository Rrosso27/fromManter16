import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterStatusForkliftComponent } from './master-status-forklift.component';

describe('MasterStatusForkliftComponent', () => {
  let component: MasterStatusForkliftComponent;
  let fixture: ComponentFixture<MasterStatusForkliftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterStatusForkliftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterStatusForkliftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
