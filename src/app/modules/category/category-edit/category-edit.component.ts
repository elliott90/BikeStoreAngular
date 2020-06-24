import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/core/services/category.service';
import { ICategory } from 'src/app/shared/interfaces/ICategory';
import { GrowlerService } from 'src/app/core/growler/growler.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
})
export class CategoryEditComponent implements OnInit {
  category: ICategory;
  categoryForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private growlerService: GrowlerService,
    private fb: FormBuilder
  ) {}

  get isNewCategory(): boolean {
    return this.categoryForm.get('categoryId').value === 0;
  }

  ngOnInit(): void {
    this.route.parent.paramMap.subscribe((params) => {
      this.loadCategory(+params.get('id'));
    });

    this.categoryForm = this.fb.group({
      categoryId: [0],
      categoryName: ['', Validators.required],
    });
  }

  loadCategory(categoryId: number): void {
    this.categoryService.getCategoryById(categoryId).subscribe((data: ICategory) => this.onCategoryRetrieved(data));
  }

  onCategoryRetrieved(category: ICategory): void {
    this.category = category;
    this.categoryForm.patchValue({
      categoryId: category.categoryId,
      categoryName: category.categoryName,
    });
  }

  saveChanges(): void {
    const category: ICategory = { ...this.category, ...this.categoryForm.value };

    if (category.categoryId === 0) {
      this.createCategory(category);
    } else {
      this.updateCategory(category);
    }
  }

  updateCategory(category: ICategory): void {
    this.categoryService.updateCategory(category).subscribe(() => {
      this.growlerService.successGrowl(`Updated ${category.categoryName}`);
      this.router.navigate(['categories', 'list']);
    });
  }

  createCategory(category: ICategory): void {
    this.categoryService.addCategory(category).subscribe(() => {
      this.growlerService.successGrowl(`Added ${category.categoryName}`);
      this.router.navigate(['categories', 'list']);
    });
  }

  deleteCategory(): void {
    this.categoryService.deleteCategory(this.category).subscribe(() => {
      this.router.navigate(['categories', 'list']);
    });
  }
}
