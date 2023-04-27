import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './pages';
import { ProductsComponent } from './pages/products';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  {
    path: 'home',
    loadChildren: () => import('./pages').then((m) => m.HomeModule),
  },
  {
    path: 'search/:title',
    loadChildren: () => import('./pages').then((m) => m.ProductSearchModule),
  },
  {
    path: 'product/:id',
    loadChildren: () => import('./pages').then((m) => m.ProductDetailModule),
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: '**',
    loadChildren: () => import('./pages').then((m) => m.NotFoundModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
