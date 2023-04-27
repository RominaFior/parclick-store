import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  HomeModule,
  NotFoundModule,
  ProductDetailModule,
  ProductSearchModule,
} from './pages';
import { PublicRoutingModule } from './public-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PublicRoutingModule,
    HomeModule,
    ProductSearchModule,
    NotFoundModule,
    ProductDetailModule,
  ],
  providers: [],
  exports: [],
})
export class PublicModule {}
