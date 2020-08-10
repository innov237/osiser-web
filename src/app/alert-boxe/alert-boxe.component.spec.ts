import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertBoxeComponent } from './alert-boxe.component';

describe('AlertBoxeComponent', () => {
  let component: AlertBoxeComponent;
  let fixture: ComponentFixture<AlertBoxeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertBoxeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertBoxeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
