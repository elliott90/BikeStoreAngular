import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome/welcome.component';

// Layout
import { HeaderComponent } from './core/header/header.component';
import { SidebarComponent } from './core/sidebar/sidebar.component';

// Bootstrap
import { PageNotFoundComponent } from './core/pagenotfound/pagenotfound.component';

import { SharedModule } from './shared/shared.module';
import { ProductsModule } from './modules/products/products.module';
import { CustomersModule } from './modules/customers/customers.module';
import { CoreModule } from './core/core.module';
import { ProductModule } from './modules/product/product.module';
import { CustomerModule } from './modules/customer/customer.module';
import { StoresModule } from './modules/stores/stores.module';
import { OrdersModule } from './modules/orders/orders.module';
import { OrderModule } from './modules/order/order.module';
import { UserModule } from './modules/user/user.module';
import { CreateOrderModule } from './modules/create-order/create-order.module';
import { SweetAlertComponent } from './sweet-alert/sweet-alert.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { StaffsModule } from './modules/staffs/staffs.module';
import { StaffModule } from './modules/staff/staff.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { CategoryModule } from './modules/category/category.module';
import { BrandsModule } from './modules/brands/brands.module';
import { BrandModule } from './modules/brand/brand.module';
import { HelpComponent } from './home/help/help.component';

@NgModule({
  imports: [
    NgbModule,
    CoreModule,
    SharedModule,
    BrowserModule,
    DashboardModule,
    ProductsModule,
    ProductModule,
    CustomersModule,
    CustomerModule,
    StoresModule,
    OrdersModule,
    OrderModule,
    UserModule,
    CreateOrderModule,
    StaffsModule,
    StaffModule,
    CategoriesModule,
    CategoryModule,
    BrandsModule,
    BrandModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidebarComponent,
    PageNotFoundComponent,
    SweetAlertComponent,
    HelpComponent,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'en-gb' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
