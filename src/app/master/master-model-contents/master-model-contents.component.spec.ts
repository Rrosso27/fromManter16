import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterModelContentsComponent } from './master-model-contents.component';

describe('MasterModelContentsComponent', () => {
  let component: MasterModelContentsComponent;
  let fixture: ComponentFixture<MasterModelContentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterModelContentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterModelContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
