import { IOrder } from './IOrder';
import { IOrderItem } from './IOrderItem';
import { IStore } from './IStore';

export interface IProductOrderItem {
  order: IOrder;
  orderItem: IOrderItem;
  store: IStore;
}
