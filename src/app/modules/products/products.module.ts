import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { AllProductsComponent } from './product-list/all-products.component';
import { ProductEditGuard } from './product-edit.guard';
import { SharedModule } from '../../shared/shared.module';
import { ProductsComponent } from './products.component';
import { ProductParameterServiceService } from './product-parameter-service.service';
import { ProductListCriteriaComponent } from './product-list/product-list-criteria.component';

const productsRoutes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list/all',
        component: AllProductsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(productsRoutes), SharedModule, NgbModule],
  declarations: [AllProductsComponent, ProductsComponent, ProductListCriteriaComponent],
  providers: [ProductParameterServiceService],
})
export class ProductsModule {}
