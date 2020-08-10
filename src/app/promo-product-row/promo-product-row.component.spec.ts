import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoProductRowComponent } from './promo-product-row.component';

describe('PromoProductRowComponent', () => {
  let component: PromoProductRowComponent;
  let fixture: ComponentFixture<PromoProductRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromoProductRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoProductRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
