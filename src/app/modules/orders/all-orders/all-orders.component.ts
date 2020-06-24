import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';
import { IOrder } from 'src/app/shared/interfaces/IOrder';
import { IPagedResults } from 'src/app/shared/interfaces/IPagedResults';
import { OrderStatusEnum } from 'src/app/shared/enums/OrderStatusEnum';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { OrderFilter } from 'src/app/core/filter-models/order-filter';
import { IStore } from 'src/app/shared/interfaces/IStore';
import { StoreService } from 'src/app/core/services/store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styles: [
    `
      .form-group.hidden {
        width: 0;
        margin: 0;
        border: none;
        padding: 0;
      }
      .custom-day {
        text-align: center;
        padding: 0.185rem 0.25rem;
        display: inline-block;
        height: 2rem;
        width: 2rem;
      }
      .custom-day.focused {
        background-color: #e6e6e6;
      }
      .custom-day.range,
      .custom-day:hover {
        background-color: rgb(2, 117, 216);
        color: white;
      }
      .custom-day.faded {
        background-color: rgba(2, 117, 216, 0.5);
      }
    `,
  ],
})
export class AllOrdersComponent implements OnInit {
  orders: IOrder[];
  stores$: Observable<IStore[]>;

  totalRecords: number;
  pageSize: number;

  orderStatusEnum = OrderStatusEnum;

  orderFilter: OrderFilter = {
    page: 1,
    pageSize: 10,
    search: '',
    orderStatus: 0,
    fromDate: moment().subtract(2, 'months').toJSON(),
    toDate: moment().toJSON(),
    orderStoreId: 0,
  };

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  constructor(
    private orderService: OrderService,
    private storeService: StoreService,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter
  ) {
    this.fromDate = calendar.getPrev(calendar.getToday(), 'm', 2);
    this.toDate = calendar.getToday();
  }

  ngOnInit(): void {
    this.pageSize = 20;
    this.stores$ = this.storeService.getAllStores();
    this.getOrdersPaged();
  }

  getOrdersPaged(): void {
    this.orderFilter.pageSize = this.pageSize;
    this.orderService.getOrdersPaged(this.orderFilter).subscribe((data: IPagedResults<IOrder[]>) => {
      this.orders = data.results;
      this.totalRecords = data.totalRecords;
    });
  }

  pageSizeChanged(pageSize: number): void {
    this.orderFilter.page = 1;
    this.pageSize = pageSize;
    this.getOrdersPaged();
  }

  pageChanged(page: number): void {
    this.orderFilter.page = page;
    this.getOrdersPaged();
  }

  searchOrders(): void {
    this.orderFilter.page = 1;
    this.getOrdersPaged();
  }

  onDateSelection(date: NgbDate): void {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
      this.orderFilter.toDate = new Date(date.year, date.month - 1, date.day, 23, 59, 59).toJSON();
    } else {
      this.toDate = null;
      this.fromDate = date;
      this.orderFilter.fromDate = new Date(date.year, date.month - 1, date.day, 1, 0, 1).toJSON();
    }
  }

  isHovered(date: NgbDate): boolean {
    return (
      this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate): boolean {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate): boolean {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }
}
