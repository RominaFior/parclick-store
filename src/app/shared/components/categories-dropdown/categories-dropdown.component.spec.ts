import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CategoriesDropdownComponent } from './categories-dropdown.component';
import { ProductService } from 'src/app/core';
import { first, of } from 'rxjs';
import { Category } from 'src/app/public';
import { Router, ActivatedRoute } from '@angular/router';

describe('CategoriesDropdownComponent', () => {
  let component: CategoriesDropdownComponent;
  let fixture: ComponentFixture<CategoriesDropdownComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ProductService', [
      'getAllCategories',
      'filterByCategory',
      'getProducts',
    ]);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, CategoriesDropdownComponent],
      declarations: [],
      providers: [
        { provide: ProductService, useValue: spy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParams: {},
            },
          },
        },
      ],
    });

    fixture = TestBed.createComponent(CategoriesDropdownComponent);
    component = fixture.componentInstance;
    productServiceSpy = TestBed.inject(
      ProductService
    ) as jasmine.SpyObj<ProductService>;
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate categoryNames$ with categories from the ProductService', () => {
    const expectedCategories: Category[] = [
      { id: 1, name: 'Category 1', image: '', creationAt: '', updatedAt: '' },
      { id: 2, name: 'Category 2', image: '', creationAt: '', updatedAt: '' },
    ];
    productServiceSpy.getAllCategories.and.returnValue(of(expectedCategories));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.categoryNames$).toBeDefined();
    component.categoryNames$.subscribe((categories) => {
      expect(categories).toEqual(expectedCategories);
    });
  });

  it('should filter products by category on getValues method call', () => {
    const categoryId = 1;
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
    productServiceSpy.filterByCategory.and.returnValue(of(expectedProducts));
    const routerSpy = spyOn(router, 'navigateByUrl');
    component.getValues(categoryId);
    expect(productServiceSpy.filterByCategory).toHaveBeenCalledWith(categoryId);
    productServiceSpy.filterByCategory(categoryId).subscribe((products) => {
      const queryParams = {
        ...route.snapshot.queryParams,
        categoryId: categoryId,
      };
      const urlTree = router.createUrlTree([], { queryParams });
      const url = urlTree.toString();
      expect(routerSpy).toHaveBeenCalledWith(url);
    });
  });

  it('should reset filtered products and navigate to products page on resetDropdown method call', () => {
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
    const routerSpy = spyOn(router, 'navigateByUrl');
    component.resetDropdown();
    expect(productServiceSpy.getProducts).toHaveBeenCalled();
    productServiceSpy
      .getProducts()
      .pipe(first())
      .subscribe((products) => {
        expect(productServiceSpy.filteredProducts$.getValue()).toEqual(
          expectedProducts
        );
        expect(routerSpy).toHaveBeenCalledWith('/products');
      });
  });
});
