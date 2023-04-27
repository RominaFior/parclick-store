import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ProductService } from 'src/app/core';
import { Product } from 'src/app/public/models/product.model';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css'],
})
export class ProductSearchComponent implements OnInit {
  dropdownTitle = 'Category';
  title!: string;
  products$!: Observable<Product[]>;
  categoryNames: Category[] = [];

  private subscription = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.activatedRoute.paramMap.subscribe((params) => {
        this.title = params.get('title')!;
        this.products$ = this.productService.getProductByTitle(this.title);
        this.subscription.add(
          this.products$.subscribe((products) => {
            if (Array.isArray(products)) {
              this.categoryNames = this.productService.getCategories(products);
            }
          })
        );
      })
    );
  }

  seeProduct(id: number): void {
    this.router.navigate(['/product', id]);
  }
}
