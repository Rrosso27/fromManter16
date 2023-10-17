import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterExternalUserComponent } from './master-external-user.component';

describe('MasterExternalUserComponent', () => {
  let component: MasterExternalUserComponent;
  let fixture: ComponentFixture<MasterExternalUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterExternalUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterExternalUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
