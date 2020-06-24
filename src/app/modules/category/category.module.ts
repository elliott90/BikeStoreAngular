import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { Role } from 'src/app/shared/enums/Role';
import { CategoryComponent } from './category.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';

const routes: Routes = [
  {
    path: 'category/:id',
    component: CategoryComponent,
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
        component: CategoryEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  declarations: [CategoryComponent, CategoryEditComponent],
})
export class CategoryModule {}
