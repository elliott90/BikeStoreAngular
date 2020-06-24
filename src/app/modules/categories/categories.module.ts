import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { Role } from 'src/app/shared/enums/Role';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { CategoriesComponent } from './categories.component';
import { CategoryListComponent } from './category-list/category-list.component';

const routes: Routes = [
  {
    path: 'categories',
    component: CategoriesComponent,
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
        component: CategoryListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  declarations: [CategoriesComponent, CategoryListComponent],
})
export class CategoriesModule {}
