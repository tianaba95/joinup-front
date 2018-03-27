import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderSlickSyncingComponent } from './slider-slick-syncing.component';

describe('SliderSlickSyncingComponent', () => {
  let component: SliderSlickSyncingComponent;
  let fixture: ComponentFixture<SliderSlickSyncingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderSlickSyncingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderSlickSyncingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
