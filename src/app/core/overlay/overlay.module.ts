import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { OverlayComponent } from './overlay.component';
import { OverlayRequestResponseInterceptor } from '../interceptors/overlay-request-response.interceptor';

@NgModule({
  imports: [CommonModule],
  exports: [OverlayComponent],
  declarations: [OverlayComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: OverlayRequestResponseInterceptor,
      multi: true,
    },
  ],
})
export class OverlayModule {}
