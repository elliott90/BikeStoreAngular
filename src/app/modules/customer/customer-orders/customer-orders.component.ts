import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';
import { IOrder } from 'src/app/shared/interfaces/IOrder';
import { ActivatedRoute } from '@angular/router';
import { OrderStatusEnum } from 'src/app/shared/enums/OrderStatusEnum';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
})
export class CustomerOrdersComponent implements OnInit {
  orderStatusEnum = OrderStatusEnum;
  customerId: number;
  orders: IOrder[] = [];

  selectedOrder: IOrder;

  constructor(private orderService: OrderService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.parent.paramMap.subscribe((param) => {
      this.customerId = +param.get('id');
      this.getOrders();
    });
  }

  getOrders(): void {
    this.orderService.getOrdersForCustomer(this.customerId).subscribe((data: IOrder[]) => {
      this.orders = data;
    });
  }
}
