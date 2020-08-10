import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductByCategorieComponent } from './product-by-categorie.component';

describe('ProductByCategorieComponent', () => {
  let component: ProductByCategorieComponent;
  let fixture: ComponentFixture<ProductByCategorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductByCategorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductByCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
