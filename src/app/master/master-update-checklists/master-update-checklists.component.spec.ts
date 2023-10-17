import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterUpdateChecklistsComponent } from './master-update-checklists.component';

describe('MasterUpdateChecklistsComponent', () => {
  let component: MasterUpdateChecklistsComponent;
  let fixture: ComponentFixture<MasterUpdateChecklistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterUpdateChecklistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterUpdateChecklistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
