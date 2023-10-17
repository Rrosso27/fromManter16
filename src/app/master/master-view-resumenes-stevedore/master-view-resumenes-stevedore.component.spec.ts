import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterViewResumenesStevedoreComponent } from './master-view-resumenes-stevedore.component';

describe('MasterViewResumenesStevedoreComponent', () => {
  let component: MasterViewResumenesStevedoreComponent;
  let fixture: ComponentFixture<MasterViewResumenesStevedoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterViewResumenesStevedoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterViewResumenesStevedoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
