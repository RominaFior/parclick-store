import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {  CategoriesDropdownComponent, PriceDropdownComponent, SearchComponent } from 'src/app/shared';
import { ProductSearchComponent } from './product-search.component';

@NgModule({
  declarations: [ProductSearchComponent],
  imports: [
    CommonModule,
    SearchComponent,
    FormsModule,
    CategoriesDropdownComponent,
    PriceDropdownComponent,
    RouterModule.forChild([{ path: '', component: ProductSearchComponent }]),
  ],
  exports: [ProductSearchComponent],
})
export class ProductSearchModule {}
