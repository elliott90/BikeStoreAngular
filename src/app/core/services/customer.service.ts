import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IPagedResults } from 'src/app/shared/interfaces/IPagedResults';
import { IPagedResponse } from 'src/app/shared/interfaces/IPagedResponse';
import { IApiResponse } from 'src/app/shared/interfaces/IApiResponse';
import { environment } from 'src/environments/environment';
import { ICustomer } from '../../shared/interfaces/ICustomer';
import { CustomerFilter } from '../filter-models/customer-filter';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private customersUrl = `${environment.apiUrl}api/Customers`;
  private recentlyViewedCustomerIds: number[] = [];

  private lastViewedCustomer = new Subject<ICustomer>();

  get getRecentCustomer(): Observable<ICustomer> {
    return this.lastViewedCustomer.asObservable();
  }

  constructor(private http: HttpClient) {}

  getCustomers(filters: CustomerFilter): Observable<IPagedResults<ICustomer[]>> {
    let params = new HttpParams()
      .set('page', filters.page.toString())
      .set('pageSize', filters.pageSize.toString())
      .set('search', filters.search);

    if (filters.state) {
      params = params.append('state', filters.state);
    }

    return this.http
      .get<ICustomer[]>(`${this.customersUrl}`, { observe: 'response', params })
      .pipe(
        map((res) => {
          const pagination = JSON.parse(res.headers.get('X-Pagination')) as IPagedResponse;
          const customers = res.body as ICustomer[];

          return {
            results: customers,
            totalRecords: pagination.totalRecords,
            pageNumber: pagination.pageNumber,
            pageSize: pagination.pageSize,
          };
        })
      );
  }

  getCustomer(customerId: number): Observable<ICustomer> {
    if (customerId === 0) {
      return of(this.initializeCustomer());
    }
    return this.http.get<ICustomer>(`${this.customersUrl}/${customerId}`).pipe(
      tap((data: ICustomer) => {
        this.addCustomerToRecentList(data.customerId);
        this.lastViewedCustomer.next(data);
      })
    );
  }

  updateCustomer(customer: ICustomer): Observable<IApiResponse> {
    return this.http.put<IApiResponse>(`${this.customersUrl}/${customer.customerId}`, customer);
  }

  addCustomer(customer: ICustomer): Observable<ICustomer> {
    return this.http.post<ICustomer>(`${this.customersUrl}`, customer);
  }

  searchCustomers(filters: CustomerFilter): Observable<IPagedResults<ICustomer[]>> {
    const params = new HttpParams()
      .set('page', filters.page.toString())
      .set('pageSize', filters.pageSize.toString())
      .set('search', filters.search);

    return this.http
      .get<ICustomer[]>(`${this.customersUrl}/search`, { observe: 'response', params })
      .pipe(
        map((res) => {
          const pagination = JSON.parse(res.headers.get('X-Pagination')) as IPagedResponse;
          const customers = res.body as ICustomer[];

          return {
            results: customers,
            totalRecords: pagination.totalRecords,
            pageNumber: pagination.pageNumber,
            pageSize: pagination.pageSize,
          };
        })
      );
  }

  getRecentlyLookedAtCustomersCount(): Observable<number> {
    return of(this.recentlyViewedCustomerIds.length);
  }

  private addCustomerToRecentList(customerId: number) {
    if (!this.recentlyViewedCustomerIds.find((id) => id === customerId)) {
      this.recentlyViewedCustomerIds.push(customerId);
    }
  }

  getTotalCustomerCount(): Observable<number> {
    return this.http.get<number>(`${this.customersUrl}/CustomerCount`);
  }

  private initializeCustomer(): ICustomer {
    return {
      customerId: 0,
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      orders: null,
      ordersCount: null,
    };
  }
}
