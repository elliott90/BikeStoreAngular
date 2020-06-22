import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

//  https://jasonwatmore.com/post/2018/10/17/c-pure-pagination-logic-in-c-aspnet

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  private pagerTotalItems: number;
  private pagerPageSize: number;

  totalPages: number;
  pages: number[] = [];
  maxPages = 5;
  currentPage = 1;
  isVisible = false;
  previousEnabled = false;
  nextEnabled = true;
  paginationOptions: number[] = [10, 20, 30, 40, 50, 60];
  ofRecords: string;

  @Input() get pageSize(): number {
    return this.pagerPageSize;
  }

  set pageSize(size: number) {
    this.pagerPageSize = size;
    this.update();
  }

  @Input() get totalItems(): number {
    return this.pagerTotalItems;
  }

  set totalItems(itemCount: number) {
    this.pagerTotalItems = itemCount;
    this.update();
  }

  @Output() pageChanged: EventEmitter<number> = new EventEmitter();
  @Output() pageSizeChanged: EventEmitter<number> = new EventEmitter();

  showingNString(): void {
    const start = (this.currentPage - 1) * this.pageSize + 1;
    let end = this.pagerTotalItems;
    if (this.pagerTotalItems > this.pagerPageSize) {
      end = this.currentPage === this.totalPages ? this.pagerTotalItems : this.currentPage * this.pageSize + 1;
    }
    this.ofRecords = `viewing ${start} - ${end} of ${this.pagerTotalItems}`;
  }

  update(): void {
    this.pages = [];
    this.showingNString();

    if (this.pagerTotalItems && this.pagerPageSize) {
      this.totalPages = Math.ceil(this.pagerTotalItems / this.pageSize);

      if (this.totalItems >= this.pageSize) {
        this.isVisible = true;
        let startPage: number;
        let endPage: number;

        if (this.totalPages <= this.maxPages) {
          startPage = 1;
          endPage = this.totalPages;
        } else {
          const maxPagesBeforeCurrentPage = Math.floor(this.maxPages / 2);
          const maxPagesAfterCurrentPage = Math.ceil(this.maxPages / 2) - 1;

          // If current page is less than or equal to maximum
          if (this.currentPage <= maxPagesBeforeCurrentPage) {
            // current page near the start
            startPage = 1;
            endPage = this.maxPages;
          } else if (this.currentPage + maxPagesAfterCurrentPage >= this.totalPages) {
            // current page near the end
            startPage = this.totalPages - this.maxPages + 1;
            endPage = this.totalPages;
          } else {
            // current page somewhere in the middle
            startPage = this.currentPage - maxPagesBeforeCurrentPage;
            endPage = this.currentPage + maxPagesAfterCurrentPage;
          }
        }

        for (let i = startPage; i < endPage + 1; i += 1) {
          this.pages.push(i);
        }

        return;
      }
    }

    this.isVisible = false;
  }

  previousNext(direction: number, event?: MouseEvent): void {
    let page: number = this.currentPage;
    if (direction === -1) {
      if (page > 1) {
        page -= 1;
      }
    } else if (page < this.totalPages) {
      page += 1;
    }
    this.changePage(page, event);
  }

  changePage(page: number, event?: MouseEvent): void {
    if (event) {
      event.preventDefault();
    }
    if (this.currentPage === page) {
      return;
    }
    this.currentPage = page;
    this.previousEnabled = this.currentPage > 1;
    this.nextEnabled = this.currentPage < this.totalPages;
    this.pageChanged.emit(page);
    this.update();
  }

  changePageSize(pageSize: number, event?: MouseEvent): void {
    if (event) {
      event.preventDefault();
    }

    this.pageSizeChanged.emit(pageSize);
    this.currentPage = 1;
  }
}
