import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { SharedModule } from '../../shared/shared.module';
import { CanActivateGuard } from './guards/can-activate.guard';

const routes: Routes = [
  {
    path: 'order/:id',
    component: OrderComponent,
    canActivate: [CanActivateGuard],
    children: [
      {
        path: '',
        redirectTo: 'details',
        pathMatch: 'full',
      },
      {
        path: 'details',
        component: OrderDetailsComponent,
      },
      {
        path: 'orders',
        component: OrderDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [OrderComponent, OrderDetailsComponent],
})
export class OrderModule {}
