import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CreateOrderComponent } from './create-order/create-order.component';

@Injectable({
  providedIn: 'root',
})
export class CreateOrderGuard implements CanDeactivate<CreateOrderComponent> {
  canDeactivate(
    component: CreateOrderComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (component.orderForm.dirty) {
      return confirm(`Navigate away and lose all changes to this order?`);
    }

    return true;
  }
}
