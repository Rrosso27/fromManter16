import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterViewPdfCatalogueComponent } from './master-view-pdf-catalogue.component';

describe('MasterViewPdfCatalogueComponent', () => {
  let component: MasterViewPdfCatalogueComponent;
  let fixture: ComponentFixture<MasterViewPdfCatalogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterViewPdfCatalogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterViewPdfCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
