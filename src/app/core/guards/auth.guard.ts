import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from 'src/app/shared/enums/Role';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Check to see if the user is authorized if not, try and login and set the return url
    // if (!this.authService.authContext) {

    // if (!this.authService.isAuthorized()) {
    //   localStorage.setItem('redirectAuthUrl', state.url);
    //   this.authService.login();
    //   return false;
    // }

    // const roles = route.data.roles as Role[];
    // if (roles && roles.length > 0 && !roles.some((r) => this.authService.isInRole(r))) {
    //   this.router.navigate(['unauthorised']);
    //   return false;
    // }

    return true;
  }
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
