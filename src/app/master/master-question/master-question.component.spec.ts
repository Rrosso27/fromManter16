import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterQuestionComponent } from './master-question.component';

describe('MasterQuestionComponent', () => {
  let component: MasterQuestionComponent;
  let fixture: ComponentFixture<MasterQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
