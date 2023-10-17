import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterViewResumenesPlatformComponent } from './master-view-resumenes-platform.component';

describe('MasterViewResumenesPlatformComponent', () => {
  let component: MasterViewResumenesPlatformComponent;
  let fixture: ComponentFixture<MasterViewResumenesPlatformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterViewResumenesPlatformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterViewResumenesPlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
