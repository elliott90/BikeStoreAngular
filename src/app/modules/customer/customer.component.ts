import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICustomer } from '../../shared/interfaces/ICustomer';
import { CustomerService } from '../../core/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
})
export class CustomerComponent implements OnInit {
  customerId: number;
  customer: ICustomer;

  constructor(private customerService: CustomerService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      this.customerId = +param.get('id');
    });
  }

  getCustomer(): void {
    this.customerService.getCustomer(this.customerId).subscribe((data: ICustomer) => {
      this.customer = data;
    });
  }
}
