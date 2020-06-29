import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { ProductFilter } from 'src/app/core/filter-models/product-filter';
import { IProduct } from '../../interfaces/IProduct';
import { IPagedResults } from '../../interfaces/IPagedResults';
import { ICustomer } from '../../interfaces/ICustomer';
import { SearchListBaseComponent } from '../search-list-base/search-list-base.component';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss'],
})
export class ProductSearchComponent implements OnInit {
  products: IPagedResults<IProduct[]>;

  filter: ProductFilter = {
    search: '',
    page: 1,
    pageSize: 5,
  };

  totalRecords = 0;
  totalPages = 0;

  // When selected a customer we want to emit this to the parent component
  @Output() resultClickChanged: EventEmitter<ICustomer> = new EventEmitter();

  // Access the child component
  @ViewChild(SearchListBaseComponent) filterComponent: SearchListBaseComponent;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  gotSearchFromChild(search: string): void {
    if (search === '') {
      this.resetForm();
    } else {
      this.filter.search = search;
      this.filter.page = 1;
      this.performSearch();
    }
  }

  gotPageFromChild(page: number): void {
    this.filter.page = page;
    this.performSearch();
  }

  performSearch(): void {
    this.productService.getProducts(this.filter).subscribe((products: IPagedResults<IProduct[]>) => {
      this.products = products;
      this.totalPages = Math.ceil(products.totalRecords / products.pageSize);
      this.totalRecords = products.totalRecords;
    });
  }

  selectProduct(customer: ICustomer): void {
    // Emit the data to the parent component
    this.resultClickChanged.emit(customer);
    this.resetForm();
  }

  resetForm(): void {
    // Clear the list
    this.products = null;
    this.totalRecords = 0;
    this.totalPages = 0;

    // reset the child base component text to nothing...
    this.filterComponent.searchBox.nativeElement.value = '';
  }
}
