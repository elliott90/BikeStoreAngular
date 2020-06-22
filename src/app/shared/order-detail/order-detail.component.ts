import { Component, OnInit, Input } from '@angular/core';
import { IOrder } from '../interfaces/IOrder';
import { OrderStatusEnum } from '../enums/OrderStatusEnum';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
})
export class OrderDetailComponent implements OnInit {
  orderStatusEnum = OrderStatusEnum;

  @Input() order: IOrder;

  constructor() {}

  ngOnInit(): void {}
}
