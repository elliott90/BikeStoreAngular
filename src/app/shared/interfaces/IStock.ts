import { IStore } from './IStore';

export interface IStock {
  storeId: number;
  productId: number;
  quantity: number | null;

  store: IStore | null;
}
