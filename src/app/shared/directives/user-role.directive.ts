import { Directive, OnInit, ElementRef, Input } from '@angular/core';
import { Auth2Service } from 'src/app/core/services/auth2.service';
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

  constructor(private el: ElementRef, private authservice: Auth2Service) {}

  ngOnInit(): void {
    let hasAccess = false;

    if (this.authservice.isLoggedIn && this.userRoles) {
      hasAccess = this.userRoles.some((r) => this.authservice.isInRole(r));
    }

    if (!hasAccess) {
      this.el.nativeElement.style.display = 'none';
    }
    // if (!this.authservice.isLoggedIn) {
    //   this.el.nativeElement.style.display = 'none';
    // }

    // this.authservice.authContextChanged.subscribe(() => {
    //   if (!this.authservice.isInRole(this.role)) {
    //     this.el.nativeElement.style.display = 'none';
    //   } else {
    //     this.el.nativeElement.removeAttribute('display');
    //   }
    // });
  }
}
