import { Injectable } from '@angular/core';
import { Subject, Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private debugChangedSubject = new Subject<boolean>();
  debugChanged = this.debugChangedSubject.asObservable();

  private isDebug = false;

  constructor() {}

  changeDebugValue(value: boolean): void {
    this.debugChangedSubject.next(value);
    this.isDebug = value;
  }

  isDebugging(): Observable<boolean> {
    return from(this.debugChanged);
  }
}
