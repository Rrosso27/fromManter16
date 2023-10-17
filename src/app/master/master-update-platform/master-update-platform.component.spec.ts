import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterUpdatePlatformComponent } from './master-update-platform.component';

describe('MasterUpdatePlatformComponent', () => {
  let component: MasterUpdatePlatformComponent;
  let fixture: ComponentFixture<MasterUpdatePlatformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterUpdatePlatformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterUpdatePlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
