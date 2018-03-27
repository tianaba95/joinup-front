import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanCard4Component } from './plan-card4.component';

describe('PlanCard4Component', () => {
  let component: PlanCard4Component;
  let fixture: ComponentFixture<PlanCard4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanCard4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanCard4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
