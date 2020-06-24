/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { UserManager, User, UserManagerSettings, SignoutResponse, WebStorageStateStore } from 'oidc-client';
import { Constants } from 'src/app/constants';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthContext } from 'src/app/shared/model/auth-context';
import { Router } from '@angular/router';
import { Role } from 'src/app/shared/enums/Role';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  private _userManager: UserManager;
  private _user: User;

  private _loginChangedSubject = new Subject<boolean>();
  private _authContextSubject = new Subject<boolean>();

  loginChanged = this._loginChangedSubject.asObservable();
  authContextChanged = this._authContextSubject.asObservable();
  authContext: AuthContext;

  redirectUrl = '/';

  constructor(private _httpClient: HttpClient, private _router: Router) {
    const stsSettings: UserManagerSettings = {
      authority: Constants.stsAuthority,
      client_id: Constants.clientId,
      redirect_uri: `${Constants.clientRoot}signin-callback`,
      scope: 'openid profile bikestoreapi roles',
      response_type: 'code',
      post_logout_redirect_uri: `${Constants.clientRoot}signout-callback`,
      automaticSilentRenew: true,
      silent_redirect_uri: `${Constants.clientRoot}assets/silent-callback.html`,
      userStore: new WebStorageStateStore({ store: localStorage }),
    };

    this._userManager = new UserManager(stsSettings);
    this._userManager.events.addAccessTokenExpired(() => {
      this._loginChangedSubject.next(false);
    });
    this._userManager.events.addUserLoaded((user) => {
      if (this._user !== user) {
        this._user = user;
        this.loadSecurityContext();
        this._loginChangedSubject.next(!!user && !user.expired);
      }
    });
  }

  isAuthorized(): boolean {
    return !!this._user;
  }

  login(): Promise<void> {
    return this._userManager.signinRedirect();
  }

  isLoggedIn(): Promise<boolean> {
    return this._userManager.getUser().then((user) => {
      const userCurrent = !!user && !user.expired;
      if (this._user !== user) {
        this._loginChangedSubject.next(userCurrent);
      }
      if (userCurrent && !this.authContext) {
        this.loadSecurityContext();
      }
      this._user = user;
      return userCurrent;
    });
  }

  completeLogin(): Promise<User> {
    return this._userManager.signinRedirectCallback().then((user) => {
      this._user = user;
      this._loginChangedSubject.next(!!user && !user.expired);
      return user;
    });
  }

  logout(): void {
    this._userManager.signoutRedirect();
  }

  completeLogout(): Promise<SignoutResponse> {
    this._user = null;
    this._loginChangedSubject.next(false);
    this._authContextSubject.next(false);
    return this._userManager.signoutRedirectCallback();
  }

  getAccessToken(): Promise<string | null> {
    return this._userManager.getUser().then((user) => {
      if (!!user && !user.expired) {
        return user.access_token;
      }

      return null;
    });
  }

  loadSecurityContext(): Promise<void> {
    const obs = this._httpClient.get<AuthContext>(`${Constants.apiRoot}api/auth/AuthContext`).pipe(
      map(
        (context) => {
          this.authContext = new AuthContext();
          this.authContext.claims = context.claims;
          this.authContext.userProfile = context.userProfile;
          this._authContextSubject.next(true);
        },
        (error) => console.error(error)
      )
    );

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    obs.subscribe((context) => {});
    return obs.toPromise();
  }

  isInRole(role: Role): boolean {
    return this.isLoggedIn && this.authContext && this.authContext.roles.some((x) => x === role.toString());
  }
}
