import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './customers/customer-list.component';
import { CustomersComponent } from './customers.component';
import { SharedModule } from '../../shared/shared.module';

const customerRoutes: Routes = [
  {
    path: 'customers',
    component: CustomersComponent,
    children: [
      {
        path: '',
        redirectTo: 'list/all',
        pathMatch: 'full',
      },
      {
        path: 'list/:type',
        component: CustomerListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(customerRoutes)],
  declarations: [CustomerListComponent, CustomersComponent],
})
export class CustomersModule {}
