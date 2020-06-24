import { Directive, Input, OnInit, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Role } from '../enums/Role';

@Directive({
  selector: '[appDisabledControl]',
})
export class DisabledControlDirective implements OnInit {
  @Input()
  set appDisabledControl(roles: Role[]) {
    if (!roles || !roles.length) {
      throw new Error('Roles value is empty or missed');
    }

    this.userRoles = roles;
  }

  userRoles: Role[];

  constructor(private el: ElementRef, private authservice: AuthService) {}

  ngOnInit(): void {
    let hasAccess = false;

    if (this.authservice.isLoggedIn && this.userRoles) {
      hasAccess = this.userRoles.some((r) => this.authservice.isInRole(r));
    }

    if (!hasAccess) {
      this.el.nativeElement.disabled = true;
      this.el.nativeElement.title = 'You do not have permission to do this';
    }
  }
}
