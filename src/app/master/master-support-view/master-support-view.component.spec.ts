import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterSupportViewComponent } from './master-support-view.component';

describe('MasterSupportViewComponent', () => {
  let component: MasterSupportViewComponent;
  let fixture: ComponentFixture<MasterSupportViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterSupportViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterSupportViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
