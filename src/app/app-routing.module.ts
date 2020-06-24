import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './home/welcome/welcome.component';
import { PageNotFoundComponent } from './core/pagenotfound/pagenotfound.component';
import { SweetAlertComponent } from './sweet-alert/sweet-alert.component';
import { HelpComponent } from './home/help/help.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent, pathMatch: 'full' },
  { path: 'help', component: HelpComponent },
  { path: 'sweet-alert', component: SweetAlertComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
