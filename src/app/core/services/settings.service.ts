import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private _isDebugging = new BehaviorSubject<boolean>(false);
  isDebuggingChanged = this._isDebugging.asObservable();

  showSidebar = false;
  isDebug = false;

  constructor() {}

  changeDebugValue(value: boolean): void {
    this.isDebug = value;
    this._isDebugging.next(value);
  }

  showSidebarToggle(show: boolean): void {
    this.showSidebar = show;
  }
}
