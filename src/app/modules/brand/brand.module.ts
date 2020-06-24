import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { Role } from 'src/app/shared/enums/Role';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { BrandComponent } from './brand.component';
import { BrandEditComponent } from './brand-edit/brand-edit.component';

const routes: Routes = [
  {
    path: 'brand/:id',
    component: BrandComponent,
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
        component: BrandEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  declarations: [BrandComponent, BrandEditComponent],
})
export class BrandModule {}
