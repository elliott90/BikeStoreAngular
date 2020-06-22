import { IOrder } from './IOrder';

export interface ICustomer {
  customerId: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;

  orders: IOrder[] | null;
  ordersCount: number | null;
}
