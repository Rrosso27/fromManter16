import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterChecklistsComponent } from './master-checklists.component';

describe('MasterChecklistsComponent', () => {
  let component: MasterChecklistsComponent;
  let fixture: ComponentFixture<MasterChecklistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterChecklistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterChecklistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
