import { Component, OnInit, Output, EventEmitter, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { CustomerService } from 'src/app/core/services/customer.service';
import { CustomerFilter } from 'src/app/core/filter-models/customer-filter';
import { Subject, Observable } from 'rxjs';
import { switchMap, map, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { ICustomer } from '../../interfaces/ICustomer';
import { IPagedResults } from '../../interfaces/IPagedResults';
import { SearchListBaseComponent } from '../search-list-base/search-list-base.component';

@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.scss'],
})
export class CustomerSearchComponent implements OnInit {
  private filterChanged = new Subject<CustomerFilter>();
  customers: IPagedResults<ICustomer[]>;
  customers$: Observable<IPagedResults<ICustomer[]>>;
  loading = false;

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

  ngOnInit(): void {
    this.filterChanged
      .pipe(
        tap(() => {
          this.loading = true;
        }),
        debounceTime(300),
        switchMap((filter) => this.loadCustomers(filter)),
        map((data) => {
          this.customers = data;
          this.totalPages = Math.ceil(data.totalRecords / data.pageSize);
          this.totalRecords = data.totalRecords;
        }),
        tap(() => {
          this.loading = false;
        })
      )
      .subscribe();
  }

  loadCustomers(filter: CustomerFilter): Observable<IPagedResults<ICustomer[]>> {
    return this.customerService.searchCustomers(filter);
  }

  gotSearchFromChild(search: string): void {
    if (search === '') {
      this.resetForm();
    } else {
      this.filter.search = search;
      this.filter.page = 1;
      this.filterChanged.next(this.filter);
    }
  }

  gotPageFromChild(page: number): void {
    this.filter.page = page;
    this.filterChanged.next(this.filter);
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
