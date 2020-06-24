import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IApiResponse } from 'src/app/shared/interfaces/IApiResponse';
import { environment } from 'src/environments/environment';
import { IProduct } from '../../shared/interfaces/IProduct';
import { IPagedResults } from '../../shared/interfaces/IPagedResults';
import { IPagedResponse } from '../../shared/interfaces/IPagedResponse';
import { ProductFilter } from '../filter-models/product-filter';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = `${environment.apiUrl}api/Products`;

  constructor(private http: HttpClient) {}

  getProducts(filters: ProductFilter): Observable<IPagedResults<IProduct[]>> {
    let params = new HttpParams()
      .set('page', filters.page.toString())
      .set('pagesize', filters.pageSize.toString())
      .set('search', filters.search)
      .set('minCost', filters.minCost.toString())
      .set('maxCost', filters.maxCost.toString())
      .set('productId', filters.productId.toString());

    if (filters.categoryId) {
      params = params.set('categoryId', filters.categoryId.toString());
    }
    if (filters.brandId) {
      params = params.set('brandId', filters.brandId.toString());
    }

    return this.http
      .get<IProduct[]>(`${this.productsUrl}`, { observe: 'response', params })
      .pipe(
        map((res) => {
          const pagination = JSON.parse(res.headers.get('X-Pagination')) as IPagedResponse;
          const products = res.body as IProduct[];

          this.calculateStockTotals(products);
          return {
            results: products,
            totalRecords: pagination.totalRecords,
            pageNumber: pagination.pageNumber,
            pageSize: pagination.pageSize,
          };
        })
      );
  }

  getProductsBySearchString(searchString: string): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.productsUrl}/ProductSearch/${searchString}`);
  }

  private calculateStockTotals(products: IProduct[]) {
    for (const product of products) {
      if (product && product.stocks) {
        let total = 0;
        for (const stock of product.stocks) {
          total += stock.quantity;
        }
        product.stockTotal = total;
      }
    }
  }

  getProductById(id: number): Observable<IProduct> {
    if (id === 0) {
      return of(this.initializeProduct());
    }
    // eslint-disable-next-line prettier/prettier
    return this.http.get<IProduct>(`${this.productsUrl}/${id}`);
  }

  updateProduct(product: IProduct): Observable<IApiResponse> {
    return this.http.put<IApiResponse>(`${this.productsUrl}/${product.productId}`, product);
  }

  addProduct(updatedProduct: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(`${this.productsUrl}`, updatedProduct);
  }

  deleteProduct(productId: number): Observable<IApiResponse> {
    return this.http.delete<IApiResponse>(`${this.productsUrl}/${productId}`);
  }

  getTotalProductsCount(): Observable<number> {
    return this.http.get<number>(`${this.productsUrl}/ProductCount`);
  }

  // eslint-disable-next-line class-methods-use-this
  private initializeProduct(): IProduct {
    return {
      productId: 0,
      productName: null,
      brandId: null,
      categoryId: null,
      modelYear: null,
      listPrice: null,
    };
  }
}
