import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { IOrder } from '../interfaces/IOrder';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersListComponent {
  @Input() orders: IOrder[];
  @Input() size = 'lg'; // sm or lg

  get isSmall(): boolean {
    return this.size === 'sm';
  }

  constructor() {}
}
