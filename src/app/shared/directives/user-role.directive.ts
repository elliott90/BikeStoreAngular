import { Directive, OnInit, ElementRef, Input } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Role } from '../enums/Role';

@Directive({
  selector: '[appUserRole]',
})
export class UserRoleDirective implements OnInit {
  @Input()
  set appUserRole(roles: Role[]) {
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
      this.el.nativeElement.style.display = 'none';
    }
  }
}
