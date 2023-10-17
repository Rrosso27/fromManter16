import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterToiletComponent } from './master-toilet.component';

describe('MasterToiletComponent', () => {
  let component: MasterToiletComponent;
  let fixture: ComponentFixture<MasterToiletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterToiletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterToiletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
