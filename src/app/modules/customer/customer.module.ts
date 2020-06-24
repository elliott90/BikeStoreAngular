import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { CustomerComponent } from './customer.component';
import { SharedModule } from '../../shared/shared.module';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerOrdersComponent } from './customer-orders/customer-orders.component';

const routes: Routes = [
  {
    path: 'customer/:id',
    component: CustomerComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [],
    },
    children: [
      {
        path: '',
        redirectTo: 'edit',
        pathMatch: 'full',
      },
      {
        path: 'edit',
        component: CustomerDetailsComponent,
      },
      {
        path: 'orders',
        component: CustomerOrdersComponent,
      },
    ],
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [CustomerComponent, CustomerDetailsComponent, CustomerOrdersComponent],
})
export class CustomerModule {}
