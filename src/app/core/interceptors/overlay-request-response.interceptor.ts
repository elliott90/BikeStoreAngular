import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';

import { EventBusService, EmitEvent, Events } from '../services/event-bus.service';

@Injectable()
export class OverlayRequestResponseInterceptor implements HttpInterceptor {
  constructor(private eventBus: EventBusService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.indexOf('ProductSearch') !== -1) return next.handle(req);

    this.eventBus.emit(new EmitEvent(Events.httpRequest));
    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          this.eventBus.emit(new EmitEvent(Events.httpResponse));
        }
      }),
      finalize(() => this.eventBus.emit(new EmitEvent(Events.httpResponse)))
      // catchError((err) => {
      //   this.eventBus.emit(new EmitEvent(Events.httpResponse));
      //   return of(err);
      // })
    );
  }
}
