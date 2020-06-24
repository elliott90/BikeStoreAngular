import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-out-redirect',
  template: `<div></div>`,
})
export class SignOutRedirectComponent implements OnInit {
  constructor(private _authService: AuthService, private _router: Router) {}

  ngOnInit(): void {
    this._authService.completeLogout().then((_) => {
      this._router.navigate(['/'], { replaceUrl: true });
    });
  }
}
