import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { Role } from 'src/app/shared/enums/Role';
import { BrandsComponent } from './brands.component';
import { BrandListComponent } from './brand-list/brand-list.component';

const routes: Routes = [
  {
    path: 'brands',
    component: BrandsComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [Role.Admin],
    },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: BrandListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  declarations: [BrandsComponent, BrandListComponent],
})
export class BrandsModule {}
