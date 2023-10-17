import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterMachineComponent } from './master-machine.component';

describe('MasterMachineComponent', () => {
  let component: MasterMachineComponent;
  let fixture: ComponentFixture<MasterMachineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterMachineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
