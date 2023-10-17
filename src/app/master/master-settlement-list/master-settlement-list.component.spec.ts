import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterSettlementListComponent } from './master-settlement-list.component';

describe('MasterSettlementListComponent', () => {
  let component: MasterSettlementListComponent;
  let fixture: ComponentFixture<MasterSettlementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterSettlementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterSettlementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
