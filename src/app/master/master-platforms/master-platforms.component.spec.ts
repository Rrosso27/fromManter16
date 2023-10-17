import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterPlatformsComponent } from './master-platforms.component';

describe('MasterPlatformsComponent', () => {
  let component: MasterPlatformsComponent;
  let fixture: ComponentFixture<MasterPlatformsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterPlatformsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterPlatformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
