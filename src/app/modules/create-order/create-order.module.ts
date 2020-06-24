import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { CreateOrderComponent } from './create-order/create-order.component';
import { SharedModule } from '../../shared/shared.module';
import { CreateOrderGuard } from './create-order.guard';

const routes: Routes = [
  {
    path: 'create-order/:customerId',
    component: CreateOrderComponent,
    canDeactivate: [CreateOrderGuard],
    canActivate: [AuthGuard],
    data: {
      roles: [],
    },
  },
  {
    path: 'create-order',
    component: CreateOrderComponent,
    canDeactivate: [CreateOrderGuard],
    canActivate: [AuthGuard],
    data: {
      roles: [],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule, NgbModule],
  declarations: [CreateOrderComponent],
})
export class CreateOrderModule {}
