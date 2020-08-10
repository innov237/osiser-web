import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOnMenuBoxComponent } from './card-on-menu-box.component';

describe('CardOnMenuBoxComponent', () => {
  let component: CardOnMenuBoxComponent;
  let fixture: ComponentFixture<CardOnMenuBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardOnMenuBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardOnMenuBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
