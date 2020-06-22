import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IStates } from 'src/app/shared/interfaces/IState';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  private utilsUrl = 'https://localhost:44392/api/Utils';

  constructor(private http: HttpClient) {}

  getListOfStates(): Observable<IStates[]> {
    return this.http.get<IStates[]>(`${this.utilsUrl}/states`);
  }
}
