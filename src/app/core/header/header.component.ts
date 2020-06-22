import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { ICustomer } from 'src/app/shared/interfaces/ICustomer';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { IProduct } from 'src/app/shared/interfaces/IProduct';
import { NgForm, NgModel } from '@angular/forms';
import { Role } from 'src/app/shared/enums/Role';
import { CustomerService } from '../services/customer.service';
import { AuthService } from '../services/auth.service';
import { ProductService } from '../services/product.service';
import { Auth2Service } from '../services/auth2.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
    `
      .product-search-form {
        position: relative;
      }
      #search-results {
        position: absolute;
        top: 48px;
        width: 250px;
        z-index: 5;
      }
      .product-search-spinner {
        position: absolute;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
      }
    `,
  ],
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  customersSub: Subscription;
  authSub: Subscription;

  loginLogoutText = 'Login';
  lastViewedCustomers: ICustomer[] = [];

  productsSearching = false;
  products: IProduct[];

  model: NgModel;
  productTypeAheadForm: NgForm;

  isLoggedIn = false;
  userName = 'Username';

  @ViewChild('productSearchInput') productSearchInput;

  constructor(
    private router: Router,
    private authService: AuthService,
    private auth2Service: Auth2Service,
    private customerService: CustomerService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.auth2Service.loginChanged.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
    this.auth2Service.authContextChanged.subscribe((authChanged) => {
      if (authChanged) {
        const { firstName, lastName } = this.auth2Service.authContext.userProfile;
        this.userName = `${firstName} ${lastName}`;
      }
    });

    this.customersSub = this.customerService.lastViewedCustomer.subscribe((data) => this.addRecentCustomerToList(data));

    this.auth2Service.isLoggedIn().then((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  login(): void {
    this.auth2Service.login();
  }

  logout(): void {
    this.auth2Service.logout();
  }

  ngAfterViewInit(): void {
    if (this.productSearchInput) {
      this.productSearchInput.valueChanges
        .pipe(
          debounceTime(1000), // wait 1 second until user stops typing
          distinctUntilChanged() // for example wont fire if the input is the same, i.e if user types trek and then trek 820 then back space to trek
        )
        .subscribe((value) => this.onSearch(value));
    }
  }

  addRecentCustomerToList(customer: ICustomer): void {
    const exists = this.lastViewedCustomers.find((x) => x.customerId === customer.customerId);

    if (!exists) {
      this.lastViewedCustomers.push(customer);
    }

    if (this.lastViewedCustomers.length === 5) {
      this.lastViewedCustomers.shift();
    }
  }

  onSearch(search: string): void {
    if (!search || search.length <= 2) {
      this.products = [];
      return;
    }

    this.productsSearching = true;

    this.productService.getProductsBySearchString(search).subscribe(
      (data: IProduct[]) => {
        this.products = data;
      },
      null,
      () => {
        this.productsSearching = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.customersSub.unsubscribe();
    this.authSub.unsubscribe();
  }
}
