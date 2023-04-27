import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Observable } from 'rxjs';
import { Product } from 'src/app/public/models/product.model';
import { Category } from '../../models/category.model';

import { ProductSearchComponent } from './product-search.component';
import { ProductService } from 'src/app/core';
import { CategoriesDropdownComponent, PriceDropdownComponent, SearchComponent } from 'src/app/shared';

describe('ProductSearchComponent', () => {
  let component: ProductSearchComponent;
  let fixture: ComponentFixture<ProductSearchComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    productServiceSpy = jasmine.createSpyObj('ProductService', [
      'getProductByTitle',
      'getCategories',
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ProductSearchComponent],
      imports:[SearchComponent, CategoriesDropdownComponent, PriceDropdownComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of({ get: () => 'test title' }) },
        },
        { provide: ProductService, useValue: productServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSearchComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the title and products$ properties from the route parameters', () => {
    const products: Product[] = [
      {
        id: 1,
        title: 'Test Product 1',
        description: '',
        price: 10,
        category: {
          id: 1,
          name: 'Test category',
          image: 'testimage.jpg',
          creationAt: '2023-04-27T11:40:14.480Z',
          updatedAt: '2023-04-27T11:40:14.480Z',
        },
        images: [
          'https://picsum.photos/640/640?r=3293',
          'https://picsum.photos/640/640?r=4898',
          'https://picsum.photos/640/640?r=5486',
        ],
        updatedAt: '2015',
        creationAt: '2015',
      },
      {
        id: 2,
        title: 'Test Product 2',
        description: '',
        price: 20,
        category: {
          id: 1,
          name: 'Test category',
          image: 'testimage.jpg',
          creationAt: '2023-04-27T11:40:14.480Z',
          updatedAt: '2023-04-27T11:40:14.480Z',
        },
        images: [
          'https://picsum.photos/640/640?r=3293',
          'https://picsum.photos/640/640?r=4898',
          'https://picsum.photos/640/640?r=5486',
        ],
        updatedAt: '2015',
        creationAt: '2015',
      },
    ];
    productServiceSpy.getProductByTitle.and.returnValue(of(products));

    component.ngOnInit();

    expect(component.title).toBe('test title');
    expect(productServiceSpy.getProductByTitle).toHaveBeenCalledWith(
      'test title'
    );
    expect(component.products$).toBeInstanceOf(Observable);
  });

  it('should set the category names from the products returned by productService', () => {
    const products: Product[] = [
      {
        id: 1,
        title: 'Test Product 1',
        description: '',
        price: 10,
        category: {
          id: 1,
          name: 'Category 1',
          image: '',
          creationAt: '',
          updatedAt: '',
        },
        images: [],
        creationAt: '',
        updatedAt: '',
      },
      {
        id: 2,
        title: 'Test Product 2',
        description: '',
        price: 20,
        category: {
          id: 2,
          name: 'Category 2',
          image: '',
          creationAt: '',
          updatedAt: '',
        },
        images: [],
        creationAt: '',
        updatedAt: '',
      },
    ];
    const categories: Category[] = [
      { id: 1, name: 'Category 1', image: '', creationAt: '', updatedAt: '' },
      { id: 2, name: 'Category 2', image: '', creationAt: '', updatedAt: '' },
    ];
    productServiceSpy.getProductByTitle.and.returnValue(of(products));
    productServiceSpy.getCategories.and.returnValue(categories);

    component.ngOnInit();

    expect(productServiceSpy.getCategories).toHaveBeenCalledWith(products);
    expect(component.categoryNames).toEqual(categories);
  });
});
