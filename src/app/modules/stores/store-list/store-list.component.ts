import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/core/services/store.service';
import { IStore } from 'src/app/shared/interfaces/IStore';
import { IPagedResults } from 'src/app/shared/interfaces/IPagedResults';
import { StoreFilter } from 'src/app/core/filter-models/store-filter';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
})
export class StoreListComponent implements OnInit {
  stores$: Observable<IPagedResults<IStore[]>>;

  storeFilter: StoreFilter = {
    page: 1,
    pageSize: 10,
    search: '',
  };

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.loadStores();
  }

  loadStores(): void {
    this.stores$ = this.storeService.getStores(this.storeFilter);
  }

  pageSizeChanged(pageSize: number): void {
    this.storeFilter.pageSize = pageSize;
    this.loadStores();
  }

  pageChanged(page: number): void {
    this.storeFilter.page = page;
    this.loadStores();
  }
}
