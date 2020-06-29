import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SettingsService } from '../services/settings.service';
import { ICustomer } from 'src/app/shared/interfaces/ICustomer';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/shared/interfaces/IProduct';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  userName = '';
  isDebugging = false;

  constructor(private authService: AuthService, private settingService: SettingsService, private router: Router) {}

  ngOnInit(): void {
    this.authService.loginChanged.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      // if (!loggedIn) {
      //   this.router.navigate(['']);
      // }
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

    this.settingService.isDebuggingChanged.subscribe((isDebugging) => {
      this.isDebugging = isDebugging;
    });
  }

  login(): void {
    this.authService.login();
  }

  logout(): void {
    this.authService.logout();
  }

  toggleDebugging(): void {
    this.settingService.changeDebugValue(!this.isDebugging);
  }

  handleCustomerSelect(customer: ICustomer): void {
    this.router.navigate(['customer', customer.customerId, 'edit']);
  }

  handleProductSelect(product: IProduct): void {
    this.router.navigate(['product', product.productId, 'edit']);
  }

  toggleSidebar(): void {
    this.settingService.showSidebarToggle(!this.settingService.showSidebar);
  }
}
