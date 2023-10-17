import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterTypeDocumentComponent } from './master-type-document.component';

describe('MasterTypeDocumentComponent', () => {
  let component: MasterTypeDocumentComponent;
  let fixture: ComponentFixture<MasterTypeDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterTypeDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterTypeDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
