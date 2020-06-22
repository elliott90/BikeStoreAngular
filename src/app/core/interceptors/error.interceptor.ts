import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GrowlerService } from '../growler/growler.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private growlService: GrowlerService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          const respError = error as HttpErrorResponse;
          if (respError && (respError.status === 401 || respError.status === 403)) {
            this.router.navigate(['/unauthorised']);
          }
          errorMessage = `Error ${error.status}<br>${error.message}`;
        }
        this.growlService.dangerGrowl(`Error ${error.status}: There was error, please try again.`);
        console.log(errorMessage);
        return throwError(errorMessage);
      })
    );
  }
}
