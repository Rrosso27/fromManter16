import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterSpinnerComponent } from './master-spinner.component';

describe('MasterSpinnerComponent', () => {
  let component: MasterSpinnerComponent;
  let fixture: ComponentFixture<MasterSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
