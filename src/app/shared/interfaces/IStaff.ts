import { IStore } from './IStore';

export interface IStaff {
  staffId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  active: number;
  storeId: number;
  managerId: number | null;

  manager: IStaff | null;
  store: IStore | null;
}
