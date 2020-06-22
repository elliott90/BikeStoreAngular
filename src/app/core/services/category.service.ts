import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ICategory } from 'src/app/shared/interfaces/ICategory';
import { IPagedResults } from 'src/app/shared/interfaces/IPagedResults';
import { map } from 'rxjs/operators';
import { IPagedResponse } from 'src/app/shared/interfaces/IPagedResponse';
import { IApiResponse } from 'src/app/shared/interfaces/IApiResponse';
import { CategoryFilter } from '../filter-models/category-filter';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categoryUrl = 'https://localhost:44392/api/Categories';

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.categoryUrl}/All`);
  }

  getCategoriesPaged(filters: CategoryFilter): Observable<IPagedResults<ICategory[]>> {
    const params = new HttpParams()
      .set('page', filters.page.toString())
      .set('pageSize', filters.pageSize.toString())
      .set('search', filters.search);

    return this.http
      .get<ICategory[]>(`${this.categoryUrl}`, { observe: 'response', params })
      .pipe(
        map((res) => {
          const pagination = JSON.parse(res.headers.get('X-Pagination')) as IPagedResponse;
          const categories = res.body as ICategory[];

          return {
            results: categories,
            totalRecords: pagination.totalRecords,
            pageNumber: pagination.pageNumber,
            pageSize: pagination.pageSize,
          };
        })
      );
  }

  getCategoryById(categoryId: number): Observable<ICategory> {
    if (categoryId === 0) {
      return of(this.initializeCategory());
    }
    return this.http.get<ICategory>(`${this.categoryUrl}/${categoryId}`);
  }

  addCategory(category: ICategory): Observable<ICategory> {
    return this.http.post<ICategory>(`${this.categoryUrl}`, category);
  }

  updateCategory(category: ICategory): Observable<IApiResponse> {
    return this.http.put<IApiResponse>(`${this.categoryUrl}/${category.categoryId}`, category);
  }

  deleteCategory(category: ICategory): Observable<IApiResponse> {
    return this.http.delete<IApiResponse>(`${this.categoryUrl}/${category.categoryId}`);
  }

  private initializeCategory(): ICategory {
    return {
      categoryId: 0,
      categoryName: '',
    };
  }
}
