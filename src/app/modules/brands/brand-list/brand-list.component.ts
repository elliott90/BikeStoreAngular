import { Component, OnInit } from '@angular/core';
import { IBrand } from 'src/app/shared/interfaces/IBrand';
import { BrandService } from 'src/app/core/services/brand.service';
import { BrandFilter } from 'src/app/core/filter-models/brand-filter';
import { IPagedResults } from 'src/app/shared/interfaces/IPagedResults';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
})
export class BrandListComponent implements OnInit {
  brands: IPagedResults<IBrand[]>;

  brandFilter: BrandFilter = {
    page: 1,
    pageSize: 10,
    search: '',
  };

  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.brandService.getBrandsPaged(this.brandFilter).subscribe((data: IPagedResults<IBrand[]>) => {
      this.brands = data;
    });
  }

  searchBrands(): void {
    this.brandFilter.page = 1;
    this.loadCategories();
  }

  pageSizeChanged(pageSize: number): void {
    this.brandFilter.pageSize = pageSize;
    this.loadCategories();
  }

  pageChanged(page: number): void {
    this.brandFilter.page = page;
    this.loadCategories();
  }
}
