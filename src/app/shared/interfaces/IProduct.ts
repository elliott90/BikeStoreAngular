import { IBrand } from './IBrand';
import { ICategory } from './ICategory';
import { IStock } from './IStock';

export interface IProduct {
  productId: number;
  productName: string;
  brandId: number;
  categoryId: number;
  modelYear: number;
  listPrice: number;

  brand?: IBrand;
  category?: ICategory;

  stocks?: IStock[] | null;

  // Custom Props
  stockTotal?: number;
}

export interface ProductResolved {
  product: IProduct;
  error?: any;
}
