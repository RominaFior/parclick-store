import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ProductService } from 'src/app/core';
import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  const searchUrl = '/search/';
  const productUrl = '/product/';

  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let router: Router;

  beforeEach(async () => {
    productServiceSpy = jasmine.createSpyObj('ProductService', ['getProducts']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ProductsComponent],
      providers: [{ provide: ProductService, useValue: productServiceSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should navigate to search page on navigateSearch method call', () => {
    const navigateByUrlSpy = spyOn(router, 'navigateByUrl');
    component.navigateSearch();
    expect(navigateByUrlSpy).toHaveBeenCalledWith(
      jasmine.stringMatching(/^\/search\//),
      { skipLocationChange: false }
    );
  });

  it('should navigate to product detail page on seeProduct method call', () => {
    const productId = 1;
    const navigateByUrlSpy = spyOn(router, 'navigateByUrl');
    component.seeProduct(productId);
    expect(navigateByUrlSpy).toHaveBeenCalledWith(
      jasmine.stringMatching(/^\/product\/1$/),
      { skipLocationChange: false }
    );
  });

  it('should get products from productService on component init', () => {
    const expectedProducts = [
      {
        id: 1,
        title: 'Product 1',
        price: 10,
        description: '',
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
    ];
    productServiceSpy.getProducts.and.returnValue(of(expectedProducts));
    fixture.detectChanges();
    expect(productServiceSpy.getProducts).toHaveBeenCalled();
    component.products$.subscribe((products) => {
      expect(products).toEqual(expectedProducts);
    });
  });
});
