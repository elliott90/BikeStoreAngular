import { Component, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { IPagedResults } from 'src/app/shared/interfaces/IPagedResults';
import { IStaff } from 'src/app/shared/interfaces/IStaff';
import { StaffService } from 'src/app/core/services/staff.service';
import { StaffFilter } from 'src/app/core/filter-models/staff-filter';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss'],
})
export class StaffListComponent implements OnInit {
  staff: IPagedResults<IStaff[]>;

  staffFilter: StaffFilter = {
    page: 1,
    pageSize: 10,
    search: '',
    storeId: null,
  };

  constructor(private staffService: StaffService) {}

  ngOnInit(): void {
    this.loadStaff();
  }

  loadStaff(): void {
    this.staffService.getStaff(this.staffFilter).subscribe((data: IPagedResults<IStaff[]>) => {
      this.staff = data;
    });
  }

  searchStaff(): void {
    this.staffFilter.page = 1;
    this.loadStaff();
  }

  pageSizeChanged(pageSize: number): void {
    this.staffFilter.pageSize = pageSize;
    this.loadStaff();
  }

  pageChanged(page: number): void {
    this.staffFilter.page = page;
    this.loadStaff();
  }
}
