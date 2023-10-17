import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterRegisterChecklistsComponent } from './master-register-checklists.component';

describe('MasterRegisterChecklistsComponent', () => {
  let component: MasterRegisterChecklistsComponent;
  let fixture: ComponentFixture<MasterRegisterChecklistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterRegisterChecklistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterRegisterChecklistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
