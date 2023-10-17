import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterUpdateStevedoreComponent } from './master-update-stevedore.component';

describe('MasterUpdateStevedoreComponent', () => {
  let component: MasterUpdateStevedoreComponent;
  let fixture: ComponentFixture<MasterUpdateStevedoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterUpdateStevedoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterUpdateStevedoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
