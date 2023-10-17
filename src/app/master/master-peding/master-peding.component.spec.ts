import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterPedingComponent } from './master-peding.component';

describe('MasterPedingComponent', () => {
  let component: MasterPedingComponent;
  let fixture: ComponentFixture<MasterPedingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterPedingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterPedingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
