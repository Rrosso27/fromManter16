import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterSettlementAllComponent } from './master-settlement-all.component';

describe('MasterSettlementAllComponent', () => {
  let component: MasterSettlementAllComponent;
  let fixture: ComponentFixture<MasterSettlementAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterSettlementAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterSettlementAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
