import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterBrandContentsComponent } from './master-brand-contents.component';

describe('MasterBrandContentsComponent', () => {
  let component: MasterBrandContentsComponent;
  let fixture: ComponentFixture<MasterBrandContentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterBrandContentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterBrandContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
