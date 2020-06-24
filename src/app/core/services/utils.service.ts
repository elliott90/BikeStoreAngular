import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IStates } from 'src/app/shared/interfaces/IState';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  private utilsUrl = `${environment.apiUrl}api/Utils`;

  constructor(private http: HttpClient) {}

  getListOfStates(): Observable<IStates[]> {
    return this.http.get<IStates[]>(`${this.utilsUrl}/states`);
  }
}
