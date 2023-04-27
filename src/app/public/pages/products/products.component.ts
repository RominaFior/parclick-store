import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/core';
import { Category } from '../../models/category.model';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  dropdownTitle = 'Category';
  title!: string;
  products$!: Observable<Product[]>; 
  categoryNames: Category[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.products$ = this.productService.getProducts();
  }

  navigateSearch() {
    this.router.navigate(['/search', '']);
  }

  seeProduct(id: number): void {
    this.router.navigate(['/product', id]);
  }
}
