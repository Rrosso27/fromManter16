import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterPrivacyPolicyComponent } from './master-privacy-policy.component';

describe('MasterPrivacyPolicyComponent', () => {
  let component: MasterPrivacyPolicyComponent;
  let fixture: ComponentFixture<MasterPrivacyPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterPrivacyPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterPrivacyPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
