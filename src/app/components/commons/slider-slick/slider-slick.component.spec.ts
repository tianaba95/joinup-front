import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderSlickComponent } from './slider-slick.component';

describe('SliderSlickComponent', () => {
  let component: SliderSlickComponent;
  let fixture: ComponentFixture<SliderSlickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderSlickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderSlickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
