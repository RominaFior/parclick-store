import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ProductService } from 'src/app/core';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let productService: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [RouterTestingModule, SearchComponent],
      providers: [
        {
          provide: ProductService,
          useValue: {
            getProducts: () =>
              of([
                {
                  id: 1,
                  title: 'Product 1',
                  price: 100,
                  description: 'Description 1',
                  category: { id: 1, name: 'Category 1', image: '' },
                  images: [],
                },
              ]),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize products array with data from ProductService', () => {
    spyOn(productService, 'getProducts').and.callThrough();
    component.ngOnInit();
    expect(productService.getProducts).toHaveBeenCalled();
    expect(component.products.length).toBe(1);
    expect(component.products[0].id).toBe(1);
  });

  it('should navigate to search page with search term on enter key press', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    const input = fixture.nativeElement.querySelector('input');
    input.value = 'test';
    fixture.detectChanges();
    input.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
    expect(routerSpy).toHaveBeenCalledWith(['/search', 'test']);
  });
});
