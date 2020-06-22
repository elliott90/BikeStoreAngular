import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoresComponent } from './stores.component';
import { SharedModule } from '../../shared/shared.module';
import { StoreListComponent } from './store-list/store-list.component';
import { StoreEditComponent } from './store-edit/store-edit.component';
import { StoreComponent } from './store.component';

const routes: Routes = [
  {
    path: 'stores',
    component: StoresComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: StoreListComponent,
      },
    ],
  },
  {
    path: 'store/:id',
    component: StoreComponent,
    children: [
      {
        path: 'edit',
        component: StoreEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  declarations: [StoresComponent, StoreListComponent, StoreEditComponent, StoreComponent],
})
export class StoresModule {}
