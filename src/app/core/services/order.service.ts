import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPagedResponse } from 'src/app/shared/interfaces/IPagedResponse';
import { IPagedResults } from 'src/app/shared/interfaces/IPagedResults';
import { IOrder } from 'src/app/shared/interfaces/IOrder';
import { environment } from 'src/environments/environment';
import { OrderFilter } from '../filter-models/order-filter';
import { IOrderCreation } from 'src/app/shared/interfaces/IOrderCreation';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private ordersUrl = `${environment.apiUrl}api/Orders`;

  constructor(private http: HttpClient) {}

  getOrdersPaged(filters: OrderFilter, productId = 0): Observable<IPagedResults<IOrder[]>> {
    let params = new HttpParams()
      .set('page', filters.page.toString())
      .set('pageSize', filters.pageSize.toString())
      .set('search', filters.search)
      .set('orderStatus', filters.orderStatus.toString())
      .set('orderStoreId', filters.orderStoreId.toString());

    if (filters.fromDate && filters.toDate) {
      params = params.set('fromDate', filters.fromDate.toString());
      params = params.set('toDate', filters.toDate.toString());
    }

    if (productId > 0) {
      params = params.set('productId', productId.toString());
    }

    return this.http
      .get<IOrder[]>(`${this.ordersUrl}`, { observe: 'response', params })
      .pipe(
        map((res) => {
          const pagination = JSON.parse(res.headers.get('X-Pagination')) as IPagedResponse;
          const orders = res.body as IOrder[];

          return {
            results: orders,
            totalRecords: pagination.totalRecords,
            pageNumber: pagination.pageNumber,
            pageSize: pagination.pageSize,
          };
        })
      );
  }

  getOrderById(orderId: number): Observable<IOrder> {
    return this.http.get<IOrder>(`${this.ordersUrl}/${orderId}`);
  }

  getOrdersForCustomer(customerId: number): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(`${this.ordersUrl}/customer/${customerId}`);
  }

  getTotalOrderCount(): Observable<number> {
    return this.http.get<number>(`${this.ordersUrl}/OrderCount`);
  }

  createOrder(order: IOrderCreation): Observable<IOrder> {
    return this.http.post<IOrder>(`${this.ordersUrl}`, order);
  }
}
