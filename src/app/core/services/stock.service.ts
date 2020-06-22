import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IStock } from 'src/app/shared/interfaces/IStock';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { IApiResponse } from 'src/app/shared/interfaces/IApiResponse';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private stockUrl = 'https://localhost:44392/api/stocks';

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
