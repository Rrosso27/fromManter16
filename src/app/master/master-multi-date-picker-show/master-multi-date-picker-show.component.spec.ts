import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterMultiDatePickerShowComponent } from './master-multi-date-picker-show.component';

describe('MasterMultiDatePickerShowComponent', () => {
  let component: MasterMultiDatePickerShowComponent;
  let fixture: ComponentFixture<MasterMultiDatePickerShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterMultiDatePickerShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterMultiDatePickerShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
