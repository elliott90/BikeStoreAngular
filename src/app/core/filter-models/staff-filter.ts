import { BaseFilter } from './base-filter';

export interface StaffFilter extends BaseFilter {
  storeId?: number;
}
