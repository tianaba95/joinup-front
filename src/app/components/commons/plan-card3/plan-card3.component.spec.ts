import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanCard3Component } from './plan-card3.component';

describe('PlanCard3Component', () => {
  let component: PlanCard3Component;
  let fixture: ComponentFixture<PlanCard3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanCard3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanCard3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
