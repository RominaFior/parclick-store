import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProductService } from 'src/app/core';
import { ProductDetailComponent } from './product-detail.component';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let mockActivatedRoute;
  let mockProductService: { getProductById: { and: { returnValue: (arg0: Observable<{ id: number; title: string; description: string; price: number; }>) => void; }; }; };

  beforeEach(async () => {
    mockActivatedRoute = {
      params: of({ id: 123 }),
    };

    mockProductService = jasmine.createSpyObj(['getProductById']);
    mockProductService.getProductById.and.returnValue(of({ id: 123, title: 'Test Product', description: 'This is a test product', price: 99.99 }));

    await TestBed.configureTestingModule({
      declarations: [ ProductDetailComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: ProductService, useValue: mockProductService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve the product with the given id on initialization', () => {
    expect(mockProductService.getProductById).toHaveBeenCalledWith(123);
    expect(component.product).toEqual({ id: 123, title: 'Test Product', description: 'This is a test product', price: 99.99 });
  });
});
