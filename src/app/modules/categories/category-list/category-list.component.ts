import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/shared/interfaces/ICategory';
import { CategoryService } from 'src/app/core/services/category.service';
import { CategoryFilter } from 'src/app/core/filter-models/category-filter';
import { IPagedResults } from 'src/app/shared/interfaces/IPagedResults';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  categories: IPagedResults<ICategory[]>;

  categoryFilter: CategoryFilter = {
    page: 1,
    pageSize: 10,
    search: '',
  };

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategoriesPaged(this.categoryFilter).subscribe((data: IPagedResults<ICategory[]>) => {
      this.categories = data;
    });
  }

  searchCategories(): void {
    this.categoryFilter.page = 1;
    this.loadCategories();
  }

  pageSizeChanged(pageSize: number): void {
    this.categoryFilter.pageSize = pageSize;
    this.loadCategories();
  }

  pageChanged(page: number): void {
    this.categoryFilter.page = page;
    this.loadCategories();
  }
}
