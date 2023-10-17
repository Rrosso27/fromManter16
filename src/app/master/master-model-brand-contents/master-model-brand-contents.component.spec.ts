import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterModelBrandContentsComponent } from './master-model-brand-contents.component';

describe('MasterModelBrandContentsComponent', () => {
  let component: MasterModelBrandContentsComponent;
  let fixture: ComponentFixture<MasterModelBrandContentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterModelBrandContentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterModelBrandContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
