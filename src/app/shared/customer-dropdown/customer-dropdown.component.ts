import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ICustomer } from '../interfaces/ICustomer';

@Component({
  selector: 'app-customer-dropdown',
  templateUrl: './customer-dropdown.component.html',
  styleUrls: ['./customer-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerDropdownComponent {
  @Input() customer: ICustomer;
}
