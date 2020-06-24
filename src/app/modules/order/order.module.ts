import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { OrderComponent } from './order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  {
    path: 'order/:id',
    component: OrderComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [],
    },
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
