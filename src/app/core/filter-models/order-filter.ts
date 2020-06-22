import { OrderStatusEnum } from 'src/app/shared/enums/OrderStatusEnum';
import { BaseFilter } from './base-filter';

export interface OrderFilter extends BaseFilter {
  search: string;
  orderStatus: OrderStatusEnum;
  fromDate?: string;
  toDate?: string;
  orderStoreId: number;
}
