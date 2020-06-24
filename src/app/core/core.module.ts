import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { RouterModule } from '@angular/router';
import { OverlayModule } from './overlay/overlay.module';
import { EventBusService } from './services/event-bus.service';
import { GrowlerComponent } from './growler/growler.component';
import { GrowlerService } from './growler/growler.service';
import { SharedModule } from '../shared/shared.module';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { ProductSearchComponent } from './header/components/product-search/product-search.component';
import { RecentCustomersComponent } from './header/components/recent-customers/recent-customers.component';

@NgModule({
  imports: [RouterModule, NgbModule, HttpClientModule, OverlayModule, SharedModule],
  declarations: [GrowlerComponent, ProductSearchComponent, RecentCustomersComponent],
  exports: [
    HttpClientModule,
    OverlayModule,
    NgbModule,
    GrowlerComponent,
    ProductSearchComponent,
    RecentCustomersComponent,
  ],
  providers: [
    EventBusService,
    AuthService,
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
