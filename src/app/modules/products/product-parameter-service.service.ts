import { Injectable } from '@angular/core';
import { ProductFilter } from '../../core/filter-models/product-filter';

@Injectable({
  providedIn: 'root',
})
export class ProductParameterServiceService {
  filter: ProductFilter = {
    page: 1,
    pageSize: 20,
    search: '',
    maxCost: 99999,
    minCost: 0,
    productId: 0,
    productIds: [],
  };
}
