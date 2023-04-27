import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductService } from 'src/app/core';
import { Category, Product } from 'src/app/public';

@Component({
  selector: 'app-categories-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories-dropdown.component.html',
  styleUrls: ['./categories-dropdown.component.css'],
})
export class CategoriesDropdownComponent implements OnInit {
  @Input() title = '';
  @Input() categoryName: Category[] = [];
  categoryNames$!: Observable<Category[]>;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productService.filteredProducts$ = new BehaviorSubject<Product[]>([]);
  }

  ngOnInit(): void {
    this.categoryNames$ = this.productService.getAllCategories();
  }

  getValues(values: any) {
    this.productService.filterByCategory(values).subscribe((products) => {
      const queryParams = {
        ...this.route.snapshot.queryParams,
        categoryId: values,
      };
      const urlTree = this.router.createUrlTree([], { queryParams });
      const url = urlTree.toString();
      this.router.navigateByUrl(url);
    });
  }

  resetDropdown() {
    this.productService.getProducts().subscribe(products => {
      this.productService.filteredProducts$.next(products);
      this.router.navigateByUrl('/products');
    });
  }
}
