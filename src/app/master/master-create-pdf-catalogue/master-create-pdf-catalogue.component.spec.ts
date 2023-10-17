import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterCreatePdfCatalogueComponent } from './master-create-pdf-catalogue.component';

describe('MasterCreatePdfCatalogueComponent', () => {
  let component: MasterCreatePdfCatalogueComponent;
  let fixture: ComponentFixture<MasterCreatePdfCatalogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterCreatePdfCatalogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterCreatePdfCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
