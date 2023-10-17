import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterSupportMainComponent } from './master-support-main.component';

describe('MasterSupportMainComponent', () => {
  let component: MasterSupportMainComponent;
  let fixture: ComponentFixture<MasterSupportMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterSupportMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterSupportMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
