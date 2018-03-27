import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanCard2Component } from './plan-card2.component';

describe('PlanCard2Component', () => {
  let component: PlanCard2Component;
  let fixture: ComponentFixture<PlanCard2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanCard2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanCard2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
