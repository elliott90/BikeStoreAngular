import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IPagedResults } from 'src/app/shared/interfaces/IPagedResults';
import { IStaff } from 'src/app/shared/interfaces/IStaff';
import { IPagedResponse } from 'src/app/shared/interfaces/IPagedResponse';
import { map } from 'rxjs/operators';
import { StaffFilter } from '../filter-models/staff-filter';
import { IApiResponse } from 'src/app/shared/interfaces/IApiResponse';

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  private employeeUrl = 'https://localhost:44392/api/employees';

  constructor(private http: HttpClient) {}

  getStaff(filters: StaffFilter): Observable<IPagedResults<IStaff[]>> {
    let params = new HttpParams().set('page', filters.page.toString()).set('pageSize', filters.pageSize.toString());

    if (filters.storeId) {
      params = params.set('storeId', filters.storeId.toString());
    }
    if (filters.search) {
      params = params.set('search', filters.search);
    }

    return this.http
      .get<IStaff[]>(`${this.employeeUrl}`, { observe: 'response', params })
      .pipe(
        map((res) => {
          const pagination = JSON.parse(res.headers.get('X-Pagination')) as IPagedResponse;
          const staff = res.body as IStaff[];

          return {
            results: staff,
            totalRecords: pagination.totalRecords,
            pageNumber: pagination.pageNumber,
            pageSize: pagination.pageSize,
          };
        })
      );
  }

  getAllStaff(): Observable<IStaff[]> {
    return this.http.get<IStaff[]>(`${this.employeeUrl}/all`);
  }

  getStaffById(staffId: number): Observable<IStaff> {
    if (staffId === 0) {
      return of(this.initializeStaff());
    }
    return this.http.get<IStaff>(`${this.employeeUrl}/${staffId}`);
  }

  updateStaff(staff: IStaff): Observable<IApiResponse> {
    return this.http.put<IApiResponse>(`${this.employeeUrl}/${staff.staffId}`, staff);
  }

  createStaff(staff: IStaff): Observable<IStaff> {
    return this.http.post<IStaff>(`${this.employeeUrl}`, staff);
  }

  private initializeStaff(): IStaff {
    return {
      staffId: 0,
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      active: 0,
      storeId: 0,
      managerId: 0,
      store: null,
      manager: null,
    }
  }
}
