import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GalleryComponent, SearchComponent } from 'src/app/shared';
import { BannerComponent } from '../../components';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent, BannerComponent ],
  imports: [
    CommonModule,
    GalleryComponent,
    SearchComponent,
    RouterModule.forChild([{ path: '', component: HomeComponent }]),
  ],
  exports: [HomeComponent],
})
export class HomeModule {}
