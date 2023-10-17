import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterNewsComponent } from './master-news.component';

describe('MasterNewsComponent', () => {
  let component: MasterNewsComponent;
  let fixture: ComponentFixture<MasterNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
