import { Component, OnInit, ViewChild } from '@angular/core';
import { IPagedResults } from 'src/app/shared/interfaces/IPagedResults';
import { ProductFilter } from 'src/app/core/filter-models/product-filter';
import { IProduct } from 'src/app/shared/interfaces/IProduct';
import { ProductService } from 'src/app/core/services/product.service';
import { ProductParameterServiceService } from '../product-parameter-service.service';
import { ProductListCriteriaComponent } from './product-list-criteria.component';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
})
export class AllProductsComponent implements OnInit {
  errorMessage: string;
  filteredProducts: IProduct[];
  totalRecords: number;

  filter: ProductFilter;

  @ViewChild(ProductListCriteriaComponent) filterComponent: ProductListCriteriaComponent;

  constructor(
    private productService: ProductService,
    private productParameterService: ProductParameterServiceService
  ) {}

  ngOnInit(): void {
    // Get the filter history from the param bag
    this.filter = this.productParameterService.filter;

    // On initial load, get first page
    this.getAllProducts(1);
  }

  getAllProducts(page: number): void {
    this.filter.page = page;

    this.productService.getProducts(this.filter).subscribe({
      next: (data: IPagedResults<IProduct[]>) => {
        this.filteredProducts = data.results;
        this.totalRecords = data.totalRecords;
      },
      error: (err) => {
        this.errorMessage = err;
      },
    });
  }

  pageChanged(page: number): void {
    this.getAllProducts(page);
  }

  pageSizeChanged(pageSize: number): void {
    this.filter.pageSize = pageSize;
    this.getAllProducts(1);
  }

  // ngAfterViewInit(): void {
  //   // Access the view child after this component initializes and set the form values from the service
  //   // this.filterComponent.filterForm.get('search').setValue(this.productParameterService.filter.search);
  //   // this.filterComponent.filterForm.get('minCost').setValue(this.productParameterService.filter.minCost);
  //   // this.filterComponent.filterForm.get('maxCost').setValue(this.productParameterService.filter.maxCost);
  // }

  performFilter(value: ProductFilter): void {
    this.filter = value;

    // Update the parameter bag to keep latest history
    this.productParameterService.filter = { ...this.productParameterService.filter, ...value };

    // Every time we perform a filter we need to revert back to page 1
    this.getAllProducts(1);
  }
}
