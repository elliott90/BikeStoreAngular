import { Component, OnInit } from '@angular/core';
import { Auth2Service } from 'src/app/core/services/auth2.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-out-redirect',
  template: `<div></div>`,
})
export class SignOutRedirectComponent implements OnInit {
  constructor(private _authService: Auth2Service, private _router: Router) {}

  ngOnInit(): void {
    this._authService.completeLogout().then((_) => {
      this._router.navigate(['/'], { replaceUrl: true });
    });
  }
}
