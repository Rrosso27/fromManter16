import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterTyreComponent } from './master-tyre.component';

describe('MasterTyreComponent', () => {
  let component: MasterTyreComponent;
  let fixture: ComponentFixture<MasterTyreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterTyreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterTyreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
