import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { PriceRange, ProductService } from 'src/app/core';
import { PriceDropdownComponent } from './price-dropdown.component';

describe('PriceDropdownComponent', () => {
  let component: PriceDropdownComponent;
  let fixture: ComponentFixture<PriceDropdownComponent>;
  let productService: jasmine.SpyObj<ProductService>;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', [
      'getProducts',
      'getProductPriceRange',
    ]);

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [FormsModule, PriceDropdownComponent],
      providers: [{ provide: ProductService, useValue: productServiceSpy }],
    }).compileComponents();

    productService = TestBed.inject(
      ProductService
    ) as jasmine.SpyObj<ProductService>;
    productService.getProducts.and.returnValue(
      of([
        {
          id: 1,
          title: 'Product 1',
          price: 100,
          description: 'Product description',
          images: [],
          creationAt: '',
          updatedAt: '',
          category: {
            id: 1,
            name: 'Category 1',
            image: '',
            creationAt: '',
            updatedAt: '',
          },
        },
      ])
    );
    productService.getProductPriceRange.and.returnValue([
      {
        id: 1,
        title: 'Product 1',
        price: 15,
        description: 'Product 1 description',
        images: ['product-1-image-url'],
        creationAt: '',
        updatedAt: '',
        category: {
          id: 1,
          name: 'Category 1',
          image: 'category-1-image-url',
          creationAt: '',
          updatedAt: '',
        },
      },
    ]);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display price ranges buttons', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons.length).toBe(6);
  });

});
