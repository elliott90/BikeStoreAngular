import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ICustomer } from '../interfaces/ICustomer';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerListComponent {
  @Input() customers: ICustomer[];
  @Input() size = 'lg';

  get isSmall(): boolean {
    return this.size === 'sm';
  }
}
