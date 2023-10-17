import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterForkliftUpdateComponent } from './master-forklift-update.component';

describe('MasterForkliftUpdateComponent', () => {
  let component: MasterForkliftUpdateComponent;
  let fixture: ComponentFixture<MasterForkliftUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterForkliftUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterForkliftUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
