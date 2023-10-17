import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterStevedoreComponent } from './master-stevedore.component';

describe('MasterStevedoreComponent', () => {
  let component: MasterStevedoreComponent;
  let fixture: ComponentFixture<MasterStevedoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterStevedoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterStevedoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
