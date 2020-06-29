import { Component } from '@angular/core';
import { Role } from 'src/app/shared/enums/Role';
import { AuthService } from '../services/auth.service';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  isLoggedIn = false;
  role = Role;

  constructor(private authService: AuthService, private settingService: SettingsService) {
    this.authService.loginChanged.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  get isAdmin(): boolean {
    return this.authService.isInRole(Role.Admin);
  }

  get isAuthorized(): boolean {
    return this.authService.isAuthorized();
  }

  get showSidebar(): boolean {
    return this.settingService.showSidebar;
  }
}
