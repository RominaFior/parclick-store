import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from './services';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule, HttpClientModule
  ],
  providers: [ProductService]
})
export class CoreModule { }
