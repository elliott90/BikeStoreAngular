export interface ISalesOrderHeader {
  salesOrderId: number;
  orderDate: Date;
  dueDate: Date;
  shipDate?: Date;
  onlineOrderFlag?: boolean;
  salesOrderNumber: string;
  purchaseOrderNumber: string;
  accountNumber: string;
  customerId: number;

  subTotal: number;
  taxAmt: number;
  freight: number;
  totalDue: number;

  comment: string;
}
