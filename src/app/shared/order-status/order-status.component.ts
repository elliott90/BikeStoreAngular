import { Component, OnInit, Input } from '@angular/core';
import { OrderStatusEnum } from '../enums/OrderStatusEnum';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
})
export class OrderStatusComponent implements OnInit {
  orderStatusEnum = OrderStatusEnum;

  @Input() orderStatus: number;

  constructor() {}

  ngOnInit(): void {}
}
