import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';
import { IProductOrderItem } from 'src/app/shared/interfaces/IProductOrderItem';
import { IPagedResults } from 'src/app/shared/interfaces/IPagedResults';
import { OrderStatusEnum } from 'src/app/shared/enums/OrderStatusEnum';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/interfaces/IProduct';
import { OrderFilter } from 'src/app/core/filter-models/order-filter';
import { AuthService } from 'src/app/core/services/auth.service';
import { IOrder } from 'src/app/shared/interfaces/IOrder';

@Component({
  selector: 'app-product-orders',
  templateUrl: './product-orders.component.html',
})
export class ProductOrdersComponent implements OnInit {
  product: IProduct;
  orderStatusEnum = OrderStatusEnum;
  orderItems: IProductOrderItem[];
  orders: IOrder[] = [];
  totalRecords: number;
  pageSize: number;
  errorMessage: string;

  orderFilter: OrderFilter = {
    page: 1,
    pageSize: 20,
    search: '',
    orderStatus: 0,
    orderStoreId: 0,
  };

  constructor(private orderService: OrderService, private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit(): void {
    this.pageSize = 10;

    this.route.parent.data.subscribe((data) => {
      const { error, product } = data.resolvedData;
      this.errorMessage = error;

      this.product = product;
      this.getOrdersPaged();
    });
  }

  pageChanged(page: number): void {
    this.orderFilter.page = page;
    this.getOrdersPaged();
  }

  pageSizeChanged(pageSize: number): void {
    this.orderFilter.page = 1;
    this.orderFilter.pageSize = pageSize;
    this.getOrdersPaged();
  }

  getOrdersPaged(): void {
    this.orderService
      .getOrdersPaged(this.orderFilter, this.product.productId)
      .subscribe((data: IPagedResults<IOrder[]>) => {
        this.orders = data.results;
        this.totalRecords = data.totalRecords;
      });
  }

  isAdmin(): boolean {
    return this.authService.isAuthenticated;
  }
}
