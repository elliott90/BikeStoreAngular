import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { ProductComponent } from './product.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductResolver } from './product-resolver.service';
import { ProductStockComponent } from './product-stock/product-stock.component';
import { ProductOrdersComponent } from './product-orders/product-orders.component';

const routes: Routes = [
  {
    path: 'product/:id',
    component: ProductComponent,
    resolve: { resolvedData: ProductResolver },
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: '',
        redirectTo: 'edit',
        pathMatch: 'full',
      },
      {
        path: 'edit',
        component: ProductEditComponent,
      },
      {
        path: 'stock',
        component: ProductStockComponent,
      },
      {
        path: 'orders',
        component: ProductOrdersComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule, NgbModule],
  declarations: [ProductComponent, ProductEditComponent, ProductStockComponent, ProductOrdersComponent],
})
export class ProductModule {}
