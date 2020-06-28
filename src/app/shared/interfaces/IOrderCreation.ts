import { ICustomer } from 'src/app/shared/interfaces/ICustomer';
import { IProduct } from 'src/app/shared/interfaces/IProduct';

export interface IOrderCreation {
  customer: ICustomer;
  products: IProduct;
  storeId: number;
  staffId: number;
}
