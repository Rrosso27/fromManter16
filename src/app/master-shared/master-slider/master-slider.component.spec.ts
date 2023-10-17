import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterSliderComponent } from './master-slider.component';

describe('MasterSliderComponent', () => {
  let component: MasterSliderComponent;
  let fixture: ComponentFixture<MasterSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
