import { IOrderCreation } from '../interfaces/IOrderCreation';
import { ICustomer } from '../interfaces/ICustomer';
import { IProduct } from '../interfaces/IProduct';

export class OrderCreation implements IOrderCreation {
  customer: ICustomer;
  products: IProduct;
  storeId: number;
  staffId: number;
}
