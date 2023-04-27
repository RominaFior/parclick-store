import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicModule } from './public/public.module';

const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forRoot(routes), PublicModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
