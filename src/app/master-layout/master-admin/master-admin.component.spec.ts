import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterAdminComponent } from './master-admin.component';

describe('MasterAdminComponent', () => {
  let component: MasterAdminComponent;
  let fixture: ComponentFixture<MasterAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
