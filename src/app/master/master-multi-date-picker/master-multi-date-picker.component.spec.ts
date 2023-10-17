import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterMultiDatePickerComponent } from './master-multi-date-picker.component';

describe('MasterMultiDatePickerComponent', () => {
  let component: MasterMultiDatePickerComponent;
  let fixture: ComponentFixture<MasterMultiDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterMultiDatePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterMultiDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
