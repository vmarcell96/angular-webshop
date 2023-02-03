import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductDetailGuard } from './products/product-detail/product-detail.guard';
import { ProductListComponent } from './products/product-list/product-list.component';

const routes: Routes = [
  //More specific routes should always be before less specific
  { path: 'products', component: ProductListComponent },
  { 
    path: 'products/:id', 
    //if id is NaN access is denied
    canActivate: [ProductDetailGuard],
    component: ProductDetailComponent 
  },
  { path: 'welcome', component: WelcomeComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', redirectTo: 'welcome', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
