import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search-list-base',
  templateUrl: './search-list-base.component.html',
  styleUrls: ['./search-list-base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchListBaseComponent implements OnInit {
  private pagerTotalItems: number;
  private pagerPageSize: number;
  totalPages: number;
  paginationVisible = false;
  currentPage = 1;
  previousEnabled = false;
  nextEnabled = true;

  searchTextChanged = new Subject<string>();
  customerSearchText: string;

  private clickedInside = false;

  @Input() loading = false;

  @Input() inputPlaceholderText = 'Search';

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

  @Output() searchTextEvent: EventEmitter<string> = new EventEmitter();
  @Output() pageChanged: EventEmitter<number> = new EventEmitter();

  @ViewChild('searchBox') searchBox: ElementRef;

  constructor(private eRef: ElementRef) {}

  // Check to see if the user clicks outside of the component
  @HostListener('click')
  clickInside(): void {
    this.clickedInside = true;
  }

  @HostListener('document:click')
  clickout(): void {
    if (!this.clickedInside) {
      // Reset the search if the user clicks away
      this.search('');
    }
    this.clickedInside = false;
  }

  ngOnInit(): void {
    this.searchTextChanged.subscribe((searchText) => {
      this.searchTextEvent.emit(searchText);
    });
  }

  update(): void {
    this.paginationVisible = this.totalItems >= this.pageSize;
    this.totalPages = Math.ceil(this.pagerTotalItems / this.pagerPageSize);
  }

  previousNext(direction: number): void {
    let page: number = this.currentPage;
    if (direction === -1) {
      if (page > 1) {
        page -= 1;
      }
    } else if (page < this.pagerTotalItems) {
      page += 1;
    }
    this.changePage(page);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.previousEnabled = this.currentPage > 1;
    this.nextEnabled = this.currentPage < this.totalPages;
    this.pageChanged.emit(page);
  }

  search(searchText: string): void {
    this.searchTextChanged.next(searchText);
    this.currentPage = 1;
  }
}
