import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBrand } from 'src/app/shared/interfaces/IBrand';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private brandUrl = 'https://localhost:44392/api/Brands';

  constructor(private http: HttpClient) {}

  getAllBrands(): Observable<IBrand[]> {
    return this.http.get<IBrand[]>(`${this.brandUrl}/All`);
  }
}
