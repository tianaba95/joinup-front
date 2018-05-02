import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WantoguideComponent } from './wantoguide.component';

describe('WantoguideComponent', () => {
  let component: WantoguideComponent;
  let fixture: ComponentFixture<WantoguideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WantoguideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WantoguideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
