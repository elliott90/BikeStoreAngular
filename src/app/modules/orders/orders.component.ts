import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
})
export class OrdersComponent implements OnInit {
  orderCount$: Observable<number>;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderCount$ = this.orderService.getTotalOrderCount();
  }
}
