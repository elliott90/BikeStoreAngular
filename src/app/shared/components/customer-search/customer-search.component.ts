import { Component, OnInit, Output, EventEmitter, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { CustomerService } from 'src/app/core/services/customer.service';
import { CustomerFilter } from 'src/app/core/filter-models/customer-filter';
import { ICustomer } from '../../interfaces/ICustomer';
import { IPagedResults } from '../../interfaces/IPagedResults';
import { SearchListBaseComponent } from '../search-list-base/search-list-base.component';

@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.scss']
})
export class CustomerSearchComponent implements OnInit {
  customers: IPagedResults<ICustomer[]>;

  filter: CustomerFilter = {
    search: '',
    page: 1,
    pageSize: 5,
  };

  totalRecords = 0;
  totalPages = 0;

  // When selected a customer we want to emit this to the parent component
  @Output() resultClickChanged: EventEmitter<ICustomer> = new EventEmitter();

  // Access the child component
  @ViewChild(SearchListBaseComponent) filterComponent: SearchListBaseComponent;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {}

  gotSearchFromChild(search: string): void {
    // debugger;
    if (search === '') {
      this.resetForm();
    } else {
      this.filter.search = search;
      this.performSearch();
    }
  }

  gotPageFromChild(page: number): void {
    this.filter.page = page;
    this.performSearch();
  }

  performSearch(): void {
    this.customerService.searchCustomers(this.filter).subscribe((customers: IPagedResults<ICustomer[]>) => {
      this.customers = customers;
      this.totalPages = Math.ceil(customers.totalRecords / customers.pageSize);
      this.totalRecords = customers.totalRecords;
    });
  }

  selectCustomer(customer: ICustomer): void {
    // Emit the data to the parent component
    this.resultClickChanged.emit(customer);
    this.resetForm();
  }

  resetForm(): void {
    // Clear the list
    this.customers = null;
    this.totalRecords = 0;
    this.totalPages = 0;

    // reset the child base component text to nothing...
    this.filterComponent.searchBox.nativeElement.value = '';
  }
}
