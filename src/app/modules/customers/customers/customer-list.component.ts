import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/core/services/customer.service';
import { ICustomer } from 'src/app/shared/interfaces/ICustomer';
import { IPagedResults } from 'src/app/shared/interfaces/IPagedResults';
import { CustomerFilter } from 'src/app/core/filter-models/customer-filter';
import { UtilsService } from 'src/app/core/services/utils.service';
import { IStates } from 'src/app/shared/interfaces/IState';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customer',
  templateUrl: './customer-list.component.html',
})
export class CustomerListComponent implements OnInit {
  errorMessage: string;
  customers: ICustomer[];
  states$: Observable<IStates[]>;
  totalRecords: number;
  pageSize: number;

  customerFilter: CustomerFilter = {
    page: 1,
    pageSize: 20,
    search: '',
    state: '',
  };

  constructor(private customerService: CustomerService, private utilsService: UtilsService) {}

  ngOnInit(): void {
    this.pageSize = 30;

    this.states$ = this.utilsService.getListOfStates();
    this.getCustomersPaged();
  }

  getCustomersPaged(): void {
    this.customerService.getCustomers(this.customerFilter).subscribe(
      (data: IPagedResults<ICustomer[]>) => {
        this.customers = data.results;

        this.totalRecords = data.totalRecords;
      },
      (error: string) => {
        this.errorMessage = error;
      }
    );
  }

  pageSizeChanged(pageSize: number): void {
    this.customerFilter.pageSize = pageSize;
    this.getCustomersPaged();
  }

  pageChanged(page: number): void {
    this.customerFilter.page = page;
    this.getCustomersPaged();
  }

  searchCustomers(): void {
    this.getCustomersPaged();
  }
}
