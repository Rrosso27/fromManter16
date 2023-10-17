import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterCreateSliderComponent } from './master-create-slider.component';

describe('MasterCreateSliderComponent', () => {
  let component: MasterCreateSliderComponent;
  let fixture: ComponentFixture<MasterCreateSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterCreateSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterCreateSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
