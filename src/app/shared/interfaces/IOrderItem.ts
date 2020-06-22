import { IOrder } from './IOrder';
import { IProduct } from './IProduct';

export interface IOrderItem {
  orderId: number;
  itemId: number;
  productId: number;
  quantity: number;
  listPrice: number;
  discount: number;

  order: IOrder;
  product: IProduct;
}
