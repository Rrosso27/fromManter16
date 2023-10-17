import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterLogTrmComponent } from './master-log-trm.component';

describe('MasterLogTrmComponent', () => {
  let component: MasterLogTrmComponent;
  let fixture: ComponentFixture<MasterLogTrmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterLogTrmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterLogTrmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
