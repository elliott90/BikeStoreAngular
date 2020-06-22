import { IStore } from './IStore';
import { IOrderItem } from './IOrderItem';
import { ICustomer } from './ICustomer';

export interface IOrder {
  orderId: number;
  customerId: number | null;
  orderStatus: number;
  orderDate: Date | string;
  requiredDate: Date | string;
  shippedDate: Date | string | null;
  storeId: number;
  storeName: string;
  staffId: number | null;

  totalOrderAmount: number;
  totalOrderDiscount: number;

  orderItems: IOrderItem[];
  store: IStore;
  customer: ICustomer;
}
