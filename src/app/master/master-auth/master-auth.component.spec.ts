import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterAuthComponent } from './master-auth.component';

describe('MasterAuthComponent', () => {
  let component: MasterAuthComponent;
  let fixture: ComponentFixture<MasterAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
