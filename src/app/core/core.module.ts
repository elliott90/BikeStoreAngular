import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { OverlayModule } from './overlay/overlay.module';
import { EventBusService } from './services/event-bus.service';
import { GrowlerComponent } from './growler/growler.component';
import { GrowlerService } from './growler/growler.service';
import { SharedModule } from '../shared/shared.module';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { Auth2Service } from './services/auth2.service';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  imports: [NgbModule, HttpClientModule, OverlayModule, SharedModule],
  exports: [HttpClientModule, OverlayModule, NgbModule, GrowlerComponent],
  declarations: [GrowlerComponent],
  providers: [
    EventBusService,
    Auth2Service,
    GrowlerService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
