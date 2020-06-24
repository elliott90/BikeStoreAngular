import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { Role } from 'src/app/shared/enums/Role';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { StaffEditComponent } from './staff-edit/staff-edit.component';
import { StaffComponent } from './staff.component';

const routes: Routes = [
  {
    path: 'staff/:id',
    component: StaffComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [Role.Admin],
    },
    children: [
      {
        path: '',
        redirectTo: 'edit',
        pathMatch: 'full',
      },
      {
        path: 'edit',
        component: StaffEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [StaffEditComponent, StaffComponent],
})
export class StaffModule {}
