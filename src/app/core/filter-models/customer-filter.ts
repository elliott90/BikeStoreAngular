import { BaseFilter } from './base-filter';

export interface CustomerFilter extends BaseFilter {
  state?: string;
}
