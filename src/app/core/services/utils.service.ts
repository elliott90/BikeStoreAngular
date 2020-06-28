import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IStates } from 'src/app/shared/interfaces/IState';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  private utilsUrl = `${environment.apiUrl}api/Utils`;

  // Cache the states as these rarely change.
  states: IStates[];

  constructor(private http: HttpClient) {}

  getListOfStates(): Observable<IStates[]> {
    // Return cached list of states if we have them
    if (this.states) {
      return of(this.states);
    }

    return this.http.get<IStates[]>(`${this.utilsUrl}/states`).pipe(
      tap((data: IStates[]) => {
        this.states = data;
      })
    );
  }
}
