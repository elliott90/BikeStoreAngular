import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in-redirect',
  template: `<div></div>`,
})
export class SignInRedirectComponent implements OnInit {
  constructor(private _authService: AuthService, private _router: Router) {}

  ngOnInit(): void {
    this._authService.completeLogin().then((user) => {
      // Here we want to check to see if we have a redirect url from an auth guard to redirect the user to
      const redirectUrl = localStorage.getItem('redirectAuthUrl');
      if (redirectUrl) {
        localStorage.removeItem('redirectAuthUrl');
        this._router.navigateByUrl(redirectUrl, { replaceUrl: true });
      } else {
        this._router.navigate(['/dashboard'], { replaceUrl: true });
      }
    });
  }
}
