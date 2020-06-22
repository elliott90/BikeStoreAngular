import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from 'src/app/shared/interfaces/IOrder';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
})
export class OrderDetailsComponent implements OnInit {
  order: IOrder;

  constructor(private orderService: OrderService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.parent.paramMap.subscribe((param) => {
      this.getOrder(+param.get('id'));
    });
  }

  getOrder(orderId: number): void {
    this.orderService.getOrderById(orderId).subscribe((data: IOrder) => (this.order = data));
  }
}
