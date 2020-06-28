import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ICustomer } from 'src/app/shared/interfaces/ICustomer';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from 'src/app/core/services/customer.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
})
export class CustomerFormComponent implements OnInit {
  @Input() customerForm: FormGroup;
  @Input() hasCustomerOnLoad: boolean;
  @Output() customerChanged: EventEmitter<ICustomer> = new EventEmitter();

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerForm.get('notification').valueChanges.subscribe((value) => this.setNotification(value));
  }

  setNotification(notifyVia: string): void {
    const phoneControl = this.customerForm.get('phone');
    if (notifyVia === 'text') {
      phoneControl.setValidators(Validators.required);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }

  // https://weblog.west-wind.com/posts/2019/Apr/08/Using-the-ngBootStrap-TypeAhead-Control-with-Dynamic-Data
  // customerSearch = (text$: Observable<string>): Observable<ICustomer[]> =>
  //   text$.pipe(
  //     debounceTime(1000),
  //     distinctUntilChanged(),
  //     // tap(() => this.searching = true),
  //     switchMap((term) => this.customerService.searchCustomers(term))
  //     // tap(() => this.searching = false)
  //   );

  // customerFormatter = (customer: ICustomer): string => (customer ? `${customer.firstName} ${customer.lastName}` : '');

  // customerInputFormatter = (customer: ICustomer | null): string =>
  //   customer ? `${customer.firstName} ${customer.lastName}` : '';

  // selectCustomer(event: NgbTypeaheadSelectItemEvent): void {
  //   const customer = event.item as ICustomer;
  //   this.customerChanged.emit(customer);
  // }

  setCustomer(customer: ICustomer): void {
    this.customerChanged.emit(customer);
  }
}
