import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterHorometroComponent } from './master-horometro.component';

describe('MasterHorometroComponent', () => {
  let component: MasterHorometroComponent;
  let fixture: ComponentFixture<MasterHorometroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterHorometroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterHorometroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
