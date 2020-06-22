import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../../shared/shared.module';
import { SignInRedirectComponent } from './sign-in-redirect/sign-in-redirect.component';
import { SignOutRedirectComponent } from './sign-out-redirect/sign-out-redirect.component';
import { UnauthorisedComponent } from './unauthorised/unauthorised.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'unauthorised',
        component: UnauthorisedComponent,
      },
      {
        path: 'signin-callback',
        component: SignInRedirectComponent,
      },
      {
        path: 'signout-callback',
        component: SignOutRedirectComponent,
      },
    ]),
  ],
  declarations: [LoginComponent, SignInRedirectComponent, SignOutRedirectComponent, UnauthorisedComponent],
})
export class UserModule {}
