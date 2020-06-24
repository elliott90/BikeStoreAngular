/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { Constants } from 'src/app/constants';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { GrowlerService } from '../growler/growler.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService, private _router: Router, private _growlerService: GrowlerService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // only if we are fetching from our api
    if (request.url.startsWith(Constants.apiRoot)) {
      return from(
        this._authService.getAccessToken().then((token) => {
          const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
          const authReq = request.clone({ headers });

          return next.handle(authReq).toPromise();
        })
      );
    }

    return next.handle(request);
  }
}
