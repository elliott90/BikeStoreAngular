import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MomentModule } from 'ngx-moment';
import { NgxCurrencyModule, CurrencyMaskInputMode } from 'ngx-currency';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { ProductListComponent } from './products/product-list.component';

import { CalculateDiscountedCostPipe } from './pipes/calculate-discounted-cost.pipe';
import { PageHeaderComponent } from './page-header/page-header.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { EnumToArrayPipe } from './pipes/enum-to-array.pipe';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { UserRoleDirective } from './directives/user-role.directive';
import { CustomerDropdownComponent } from './customer-dropdown/customer-dropdown.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { DisabledControlDirective } from './directives/disabled-control.directive';
import { FilterCollapseComponent } from './components/filter-collapse/filter-collapse.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { DebugFormComponent } from './components/debug-form/debug-form.component';
import { FormButtonsComponent } from './components/form-buttons/form-buttons.component';
import { CustomerSearchComponent } from './components/customer-search/customer-search.component';
import { SearchListBaseComponent } from './components/search-list-base/search-list-base.component';

export const customCurrencyMaskConfig = {
  align: 'left',
  allowNegative: true,
  allowZero: true,
  decimal: '.',
  precision: 2,
  prefix: '£ ',
  suffix: '',
  thousands: ',',
  nullable: true,
  min: null,
  max: null,
  inputMode: CurrencyMaskInputMode.FINANCIAL,
};

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    MomentModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    SweetAlert2Module.forRoot(),
  ],
  declarations: [
    PaginationComponent,
    ProductListComponent,
    CalculateDiscountedCostPipe,
    PageHeaderComponent,
    OrderStatusComponent,
    EnumToArrayPipe,
    OrderDetailComponent,
    OrdersListComponent,
    UserRoleDirective,
    CustomerDropdownComponent,
    CustomerListComponent,
    DisabledControlDirective,
    FilterCollapseComponent,
    DebugFormComponent,
    FormButtonsComponent,
    CustomerSearchComponent,
    SearchListBaseComponent,
  ],
  exports: [
    CommonModule,
    NgbModule,
    MomentModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCurrencyModule,
    PaginationComponent,
    ProductListComponent,
    PageHeaderComponent,
    CalculateDiscountedCostPipe,
    EnumToArrayPipe,
    OrderStatusComponent,
    OrderDetailComponent,
    SweetAlert2Module,
    OrdersListComponent,
    UserRoleDirective,
    CustomerListComponent,
    DisabledControlDirective,
    FilterCollapseComponent,
    DebugFormComponent,
    FormButtonsComponent,
    CustomerSearchComponent,
  ],
})
export class SharedModule {}
