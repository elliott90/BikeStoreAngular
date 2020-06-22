import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  AfterViewInit,
  Input,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { ProductFilter } from 'src/app/core/filter-models/product-filter';
import { Subject, Observable } from 'rxjs';
import { ICategory } from 'src/app/shared/interfaces/ICategory';
import { IBrand } from 'src/app/shared/interfaces/IBrand';
import { CategoryService } from 'src/app/core/services/category.service';
import { BrandService } from 'src/app/core/services/brand.service';

@Component({
  selector: 'app-product-list-criteria',
  templateUrl: './product-list-criteria.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListCriteriaComponent implements OnInit, AfterViewInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  @Output() valueChange: EventEmitter<ProductFilter> = new EventEmitter<ProductFilter>();
  @Input() filter: ProductFilter;
  filterForm: FormGroup;
  categories$: Observable<ICategory[]>;
  brands$: Observable<IBrand[]>;

  constructor(private fb: FormBuilder, private categoryService: CategoryService, private brandService: BrandService) {}

  ngOnInit(): void {
    // Build the form builder group and add to the dom
    this.filterForm = this.fb.group({
      search: '',
      productId: 0,
      minCost: 0,
      maxCost: 0,
      categoryId: 0,
      brandId: 0,
    });

    this.categories$ = this.categoryService.getAllCategories();
    this.brands$ = this.brandService.getAllBrands();

    this.filterForm.patchValue(this.filter);
  }

  ngAfterViewInit(): void {
    // After initialization watch for changes on the form and execute the emitting function
    this.filterForm.valueChanges.pipe(takeUntil(this.unsubscribe$), debounceTime(1000)).subscribe(() => {
      this.emitFilter();
    });
  }

  emitFilter(): void {
    const m: ProductFilter = { ...this.filter, ...this.filterForm.value };

    this.valueChange.emit(m);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
