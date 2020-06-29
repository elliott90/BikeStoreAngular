export interface ProductFilter {
  page: number;
  pageSize: number;
  search: string;
  productId?: number;
  productIds?: number[];
  minCost?: number;
  maxCost?: number;
  categoryId?: number;
  brandId?: number;
}
