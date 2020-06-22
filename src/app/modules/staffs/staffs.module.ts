import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { StaffsComponent } from './staffs.component';
import { StaffListComponent } from './staff-list/staff-list.component';

const routes: Routes = [
  {
    path: 'staff',
    component: StaffsComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: StaffListComponent,
      },
    ],
  },
  // {
  //   path: 'store/:id',
  //   component: StoreComponent,
  //   children: [
  //     {
  //       path: 'edit',
  //       component: StoreEditComponent,
  //     },
  //   ],
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  declarations: [StaffsComponent, StaffListComponent],
})
export class StaffsModule {}
