import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterForkliftComponent } from './master-forklift.component';

describe('MasterForkliftComponent', () => {
  let component: MasterForkliftComponent;
  let fixture: ComponentFixture<MasterForkliftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterForkliftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterForkliftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
