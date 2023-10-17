import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterWorkDetailsComponent } from './master-work-details.component';

describe('MasterWorkDetailsComponent', () => {
  let component: MasterWorkDetailsComponent;
  let fixture: ComponentFixture<MasterWorkDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterWorkDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterWorkDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
