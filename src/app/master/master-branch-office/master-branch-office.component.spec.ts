import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterBranchOfficeComponent } from './master-branch-office.component';

describe('MasterBranchOfficeComponent', () => {
  let component: MasterBranchOfficeComponent;
  let fixture: ComponentFixture<MasterBranchOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterBranchOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterBranchOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
