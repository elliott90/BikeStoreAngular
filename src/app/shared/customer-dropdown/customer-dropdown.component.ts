import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ICustomer } from '../interfaces/ICustomer';

@Component({
  selector: 'app-customer-dropdown',
  templateUrl: './customer-dropdown.component.html',
  styleUrls: ['./customer-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerDropdownComponent implements OnInit {
  @Input() customer: ICustomer;

  constructor() { }

  ngOnInit(): void {
  }

}
