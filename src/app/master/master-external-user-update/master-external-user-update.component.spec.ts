import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterExternalUserUpdateComponent } from './master-external-user-update.component';

describe('MasterExternalUserUpdateComponent', () => {
  let component: MasterExternalUserUpdateComponent;
  let fixture: ComponentFixture<MasterExternalUserUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterExternalUserUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterExternalUserUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
