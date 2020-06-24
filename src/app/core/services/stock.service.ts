import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStock } from 'src/app/shared/interfaces/IStock';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { IApiResponse } from 'src/app/shared/interfaces/IApiResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private stockUrl = `${environment.apiUrl}api/stocks`;

  constructor(private http: HttpClient) {}

  getStockForProduct(id: number): Observable<IStock[]> {
    return this.http.get<IStock[]>(`${this.stockUrl}/${id}`);
  }

  updateStockForProductAndStore(stock: IStock): Observable<IApiResponse> {
    return this.http
      .put<IApiResponse>(`${this.stockUrl}/${stock.productId}`, stock)
      .pipe(tap((data) => console.log('Complete update stock', data)));
  }
}
