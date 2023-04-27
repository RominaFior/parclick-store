import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProductDetailComponent } from './components';
import { PublicRoutingModule } from './public-routing.module';

import { HomeModule, NotFoundModule, ProductSearchModule } from './pages';

@NgModule({
  declarations: [ProductDetailComponent],
  imports: [
    CommonModule,
    PublicRoutingModule,
    HomeModule,
    ProductSearchModule,
    NotFoundModule
  ],
  providers: [],
  exports: [ProductDetailComponent],
})
export class PublicModule {}
