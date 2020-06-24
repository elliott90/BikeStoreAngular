import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IBrand } from 'src/app/shared/interfaces/IBrand';
import { IPagedResults } from 'src/app/shared/interfaces/IPagedResults';
import { IPagedResponse } from 'src/app/shared/interfaces/IPagedResponse';
import { map } from 'rxjs/operators';
import { BrandFilter } from '../filter-models/brand-filter';
import { environment } from 'src/environments/environment';
import { IApiResponse } from 'src/app/shared/interfaces/IApiResponse';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private brandUrl = `${environment.apiUrl}api/Brands`;

  constructor(private http: HttpClient) {}

  getAllBrands(): Observable<IBrand[]> {
    return this.http.get<IBrand[]>(`${this.brandUrl}/All`);
  }

  getBrandsPaged(filters: BrandFilter): Observable<IPagedResults<IBrand[]>> {
    const params = new HttpParams()
      .set('page', filters.page.toString())
      .set('pageSize', filters.pageSize.toString())
      .set('search', filters.search);

    return this.http
      .get<IBrand[]>(`${this.brandUrl}`, { observe: 'response', params })
      .pipe(
        map((res) => {
          const pagination = JSON.parse(res.headers.get('X-Pagination')) as IPagedResponse;
          const categories = res.body as IBrand[];

          return {
            results: categories,
            totalRecords: pagination.totalRecords,
            pageNumber: pagination.pageNumber,
            pageSize: pagination.pageSize,
          };
        })
      );
  }

  getBrandById(brandId: number): Observable<IBrand> {
    if (brandId === 0) {
      return of(this.initializeBrand());
    }
    return this.http.get<IBrand>(`${this.brandUrl}/${brandId}`);
  }

  addBrand(brand: IBrand): Observable<IBrand> {
    return this.http.post<IBrand>(`${this.brandUrl}`, brand);
  }

  updateBrand(brand: IBrand): Observable<IApiResponse> {
    return this.http.put<IApiResponse>(`${this.brandUrl}/${brand.brandId}`, brand);
  }

  deleteBrand(brand: IBrand): Observable<IApiResponse> {
    return this.http.delete<IApiResponse>(`${this.brandUrl}/${brand.brandId}`);
  }

  private initializeBrand(): IBrand {
    return {
      brandId: 0,
      brandName: '',
    };
  }
}
