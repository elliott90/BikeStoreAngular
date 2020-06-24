import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/core/services/customer.service';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/core/services/product.service';
import { OrderService } from 'src/app/core/services/order.service';
import { ICustomer } from 'src/app/shared/interfaces/ICustomer';
import { CustomerFilter } from 'src/app/core/filter-models/customer-filter';
import { IPagedResults } from 'src/app/shared/interfaces/IPagedResults';
import { IOrder } from 'src/app/shared/interfaces/IOrder';
import { OrderFilter } from 'src/app/core/filter-models/order-filter';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  customerCount$: Observable<number>;
  orderCount$: Observable<number>;
  productCount$: Observable<number>;

  customers: IPagedResults<ICustomer[]>;
  orders: IPagedResults<IOrder[]>;

  orderFilter: OrderFilter = {
    page: 1,
    pageSize: 20,
    search: '',
    orderStatus: 0,
    orderStoreId: 0,
  };

  customerFilter: CustomerFilter = { page: 1, pageSize: 20, search: '' };

  constructor(
    private customerService: CustomerService,
    private orderService: OrderService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.customerCount$ = this.customerService.getTotalCustomerCount();
    this.orderCount$ = this.orderService.getTotalOrderCount();
    this.productCount$ = this.productService.getTotalProductsCount();

    this.loadOrders();
    this.loadCustomers();
  }

  loadOrders(): void {
    this.orderService.getOrdersPaged(this.orderFilter).subscribe((data: IPagedResults<IOrder[]>) => {
      this.orders = data;
    });
  }

  ordersPageChanged(page: number): void {
    this.orderFilter.page = page;
    this.loadOrders();
  }

  ordersPageSizeChanged(pageSize: number): void {
    this.orderFilter.page = 1;
    this.orderFilter.pageSize = pageSize;
    this.loadOrders();
  }

  loadCustomers(): void {
    this.customerService.getCustomers(this.customerFilter).subscribe((data: IPagedResults<ICustomer[]>) => {
      this.customers = data;
    });
  }

  customersPageChanged(page: number): void {
    this.customerFilter.page = page;
    this.loadCustomers();
  }

  customersPageSizeChanged(pageSize: number): void {
    this.customerFilter.page = 1;
    this.customerFilter.pageSize = pageSize;
    this.loadCustomers();
  }
}
