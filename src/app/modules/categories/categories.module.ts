import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { CategoryListComponent } from './category-list/category-list.component';

const routes: Routes = [
  {
    path: 'categories',
    component: CategoriesComponent,
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
  declarations: [CategoriesComponent, CategoryListComponent],
})
export class CategoriesModule {}
