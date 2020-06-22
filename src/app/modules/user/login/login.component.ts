import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { IUserLogin } from 'src/app/shared/interfaces/IUserLogin';
import { GrowlerService, GrowlerMessageType } from 'src/app/core/growler/growler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  errorMessage: string;
  pageTitle = 'Log In';
  userLogin: IUserLogin = {
    username: '',
    password: '',
  };

  constructor(private authService: AuthService, private router: Router, private growlerService: GrowlerService) {}

  ngOnInit(): void {}

  login(loginForm: NgForm) {
    if (loginForm && loginForm.valid) {
      this.userLogin.username = loginForm.form.value.userName;
      this.userLogin.password = loginForm.form.value.password;

      this.authService.login(this.userLogin).subscribe((status: boolean) => {
        if (this.authService.isAuthenticated) {
          if (this.authService.redirectUrl) {
            const redirectUrl = this.authService.redirectUrl;
            this.authService.redirectUrl = '';
            this.router.navigate([redirectUrl]);
          } else {
            this.router.navigate(['/orders']);
          }
        } else {
          this.growlerService.growl('Invalid login attempt', GrowlerMessageType.Danger);
          this.errorMessage = 'Not valid';
          this.router.navigate(['/login']);
        }
      });
    } else {
      this.errorMessage = 'Please enter a user name and password.';
    }
  }
}
