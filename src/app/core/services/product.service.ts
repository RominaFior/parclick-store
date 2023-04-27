import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PriceRange } from 'src/app/core';
import { Category } from 'src/app/public';
import { Product } from 'src/app/public/models/product.model';

interface CategoriesMap {
  [id: number]: Category;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = 'https://api.escuelajs.co/api/v1/products/';
  public filteredProducts$: BehaviorSubject<Product[]> = new BehaviorSubject<
    Product[]
  >([]);

  public filterTitle$: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );

  public filteredPriceRanges$: BehaviorSubject<PriceRange[]> =
    new BehaviorSubject<PriceRange[]>([]);

  public selectedCategoryIdSubject = new BehaviorSubject<number>(0);
  selectedCategoryId$ = this.selectedCategoryIdSubject.asObservable();

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  getProductsByTitle(title: string): Observable<Product[]> {
    const queryParams = { title: title };
    return this.http.get<Product[]>(this.productsUrl, { params: queryParams });
  }

  getProductByTitle(title: string): Observable<Product[]> {
    this.getProductsByTitle(title).subscribe((products) => {
      if (products !== undefined) {
        const filteredProducts = products.filter((product) =>
          product.title.toLowerCase().includes(title.toLowerCase())
        );
        this.filteredProducts$.next(filteredProducts);
        this.filterTitle$.next(title);
      }
    });
    return this.filteredProducts$;
  }

  getProductById(id: string): Observable<Product | undefined> {
    return this.http.get<Product[]>(this.productsUrl).pipe(
      map((products) => {
        const productId = Number(id);
        return products.find((product) => product.id === productId);
      })
    );
  }

  getCategories(products: Product[]) {
    const categoriesMap: CategoriesMap = products?.reduce(
      (acc: CategoriesMap, product) => {
        if (!acc[product.category.id]) {
          acc[product.category.id] = product.category;
        }
        return acc;
      },
      {}
    );
    const categoriesArray = Object.values(categoriesMap);
    return categoriesArray;
  }

  getAllCategories(): Observable<Category[]> {
    return this.getProducts().pipe(
      map((products: Product[]) => this.getCategories(products))
    );
  }

  filterProductsByCategory(categoryId: number): Observable<Product[]> {
    const queryParams = { categoryId: categoryId };
    return this.http.get<Product[]>(this.productsUrl, { params: queryParams });
  }

  filterByCategory(categoryId: number): Observable<Product[]> {
    this.filterProductsByCategory(categoryId).subscribe((products) => {
      const filteredProducts = products;
      this.filteredProducts$.next(filteredProducts);
      this.selectedCategoryIdSubject.next(categoryId);
    });
    return this.filteredProducts$;
  }

  getProductPriceRange(
    products: Product[],
    priceRanges: PriceRange[]
  ): Product[] {
    const filteredProducts = products.filter((product) => {
      const productPrice = product.price;
      const priceRange = priceRanges.find((range) => {
        return (
          range.price_min <= productPrice && range.price_max >= productPrice
        );
      });
      return !!priceRange; // Devuelve true si el producto pertenece a un rango de precios
    });
    return filteredProducts;
  }
}
