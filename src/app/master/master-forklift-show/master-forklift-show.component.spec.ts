import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterForkliftShowComponent } from './master-forklift-show.component';

describe('MasterForkliftShowComponent', () => {
  let component: MasterForkliftShowComponent;
  let fixture: ComponentFixture<MasterForkliftShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterForkliftShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterForkliftShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
