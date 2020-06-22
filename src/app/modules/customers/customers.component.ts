import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerService } from '../../core/services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
})
export class CustomersComponent implements OnInit {
  recentlyViewedCustomersCount$: Observable<number>;
  customerCount$: Observable<number>;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerCount$ = this.customerService.getTotalCustomerCount();
    this.recentlyViewedCustomersCount$ = this.customerService.getRecentlyLookedAtCustomersCount();
  }
}
