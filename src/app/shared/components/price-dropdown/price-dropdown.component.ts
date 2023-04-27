import { CommonModule, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { Component, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PriceRange, ProductService, createPriceRanges } from 'src/app/core';
import { Product } from 'src/app/public';

registerLocaleData(localeEs);

@Component({
  selector: 'app-price-dropdown',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './price-dropdown.component.html',
  styleUrls: ['./price-dropdown.component.css'],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
})
export class PriceDropdownComponent implements OnInit, OnDestroy {
  filteredPriceRanges: PriceRange[] = [];
  selectedPriceRange!: PriceRange;
  products!: Product[];
  private productsSubscription: Subscription = new Subscription();
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      this.filteredPriceRanges = createPriceRanges(this.products);
    });
  }

  filterPrices(priceRange: PriceRange) {
    this.selectedPriceRange = priceRange;
    const filteredProducts = this.productService.getProductPriceRange(
      this.products,
      [this.selectedPriceRange]
    );
    if (filteredProducts.length > 0) {
      this.productService.filteredProducts$.next(filteredProducts);
    } else {
      console.log(
        'No se encontraron productos en el rango de precios seleccionado'
      );
    }
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }
}