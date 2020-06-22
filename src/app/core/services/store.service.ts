import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IStore } from 'src/app/shared/interfaces/IStore';
import { map } from 'rxjs/operators';
import { IPagedResults } from 'src/app/shared/interfaces/IPagedResults';
import { IPagedResponse } from 'src/app/shared/interfaces/IPagedResponse';
import { StoreFilter } from '../filter-models/store-filter';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private storeUrl = 'https://localhost:44392/api/Stores';

  constructor(private http: HttpClient) {}

  getAllStores(): Observable<IStore[]> {
    return this.http.get<IStore[]>(`${this.storeUrl}/all`);
  }

  getStores(filters: StoreFilter): Observable<IPagedResults<IStore[]>> {
    let params = new HttpParams().set('page', filters.page.toString()).set('pageSize', filters.pageSize.toString());

    if (filters.search) {
      params = params.append('search', filters.search);
    }

    return this.http
      .get<IStore[]>(`${this.storeUrl}`, { observe: 'response', params })
      .pipe(
        map((res) => {
          const pagination = JSON.parse(res.headers.get('X-Pagination')) as IPagedResponse;
          const customers = res.body as IStore[];

          return {
            results: customers,
            totalRecords: pagination.totalRecords,
            pageNumber: pagination.pageNumber,
            pageSize: pagination.pageSize,
          };
        })
      );
  }

  getStore(storeId: number): Observable<IStore> {
    return this.http.get<IStore>(`${this.storeUrl}/${storeId}`);
  }
}
