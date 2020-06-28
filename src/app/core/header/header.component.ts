import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SettingsService } from '../services/settings.service';
import { ICustomer } from 'src/app/shared/interfaces/ICustomer';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  userName = '';
  isDebug = false;

  constructor(private authService: AuthService, private settingService: SettingsService, private router: Router) {}

  ngOnInit(): void {
    this.authService.loginChanged.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
    this.authService.authContextChanged.subscribe((authChanged) => {
      if (authChanged) {
        const { firstName, lastName } = this.authService.authContext.userProfile;
        this.userName = `${firstName} ${lastName}`;
      }
    });

    this.authService.isLoggedIn().then((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });

    this.settingService.debugChanged.subscribe((debug) => {
      this.isDebug = debug;
    });
  }

  login(): void {
    this.authService.login();
  }

  logout(): void {
    this.authService.logout();
  }

  toggleDebugging(): void {
    this.settingService.changeDebugValue(!this.isDebug);
  }

  handleCustomerSelect(customer: ICustomer): void {
    this.router.navigate(['customer', customer.customerId, 'edit']);
  }
}
