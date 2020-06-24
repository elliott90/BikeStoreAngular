import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICustomer } from 'src/app/shared/interfaces/ICustomer';
import { CustomerService } from 'src/app/core/services/customer.service';

@Component({
  selector: 'app-recent-customers',
  templateUrl: './recent-customers.component.html',
})
export class RecentCustomersComponent implements OnInit, OnDestroy {
  customersSub: Subscription;
  lastViewedCustomers: ICustomer[] = [];
  btnText = 'Recent Customers';
  addingCustomer = false;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customersSub = this.customerService.getRecentCustomer.subscribe((data) => this.addRecentCustomerToList(data));
  }

  private addRecentCustomerToList(customer: ICustomer): void {
    const exists = this.lastViewedCustomers.find((x) => x.customerId === customer.customerId);

    if (!exists) {
      this.lastViewedCustomers.push(customer);
      this.btnText = `${customer.firstName} added...`;
      this.addingCustomer = true;
    }

    if (this.lastViewedCustomers.length === 5) {
      this.lastViewedCustomers.shift();
    }

    setTimeout(() => {
      this.btnText = 'Recent Customers';
      this.addingCustomer = false;
    }, 2000);
  }

  ngOnDestroy(): void {
    this.customersSub.unsubscribe();
  }
}
