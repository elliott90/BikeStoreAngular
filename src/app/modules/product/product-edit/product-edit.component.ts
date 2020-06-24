import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { IApiResponse } from 'src/app/shared/interfaces/IApiResponse';
import { CategoryService } from 'src/app/core/services/category.service';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/shared/interfaces/ICategory';
import { BrandService } from 'src/app/core/services/brand.service';
import { IBrand } from 'src/app/shared/interfaces/IBrand';
import { GrowlerService, GrowlerMessageType } from 'src/app/core/growler/growler.service';
import Swal from 'sweetalert2';
import { IProduct } from 'src/app/shared/interfaces/IProduct';
import { ProductService } from 'src/app/core/services/product.service';
import { Role } from 'src/app/shared/enums/Role';

function yearRange(minYear: number, maxYear: number) {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value !== null && (isNaN(c.value) || c.value > maxYear || c.value < minYear)) {
      return { range: true };
    }

    return null;
  };
}

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductEditComponent implements OnInit {
  categories$: Observable<ICategory[]>;
  brands$: Observable<IBrand[]>;
  productForm: FormGroup;
  product: IProduct;
  errorMessage: string;
  redirectToListAfterSave = false;
  role = Role;

  get isNewProduct(): boolean {
    return this.productForm.get('productId').value === 0;
  }

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private brandService: BrandService,
    private growlerService: GrowlerService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // const toastTest = Swal.mixin({
    //   toast: true,
    //   position: 'top-end',
    //   showConfirmButton: false,
    //   timer: 3000,
    //   timerProgressBar: true,
    //   onOpen: (toast) => {
    //     toast.addEventListener('mouseenter', Swal.stopTimer);
    //     toast.addEventListener('mouseleave', Swal.resumeTimer);
    //   },
    // });

    // toastTest.fire({
    //   icon: 'success',
    //   title: 'Signed in successfully',
    // });

    this.categories$ = this.categoryService.getAllCategories();
    this.brands$ = this.brandService.getAllBrands();

    // Set up the form first
    this.productForm = this.fb.group({
      productId: { value: 0 },
      productName: ['', [Validators.required, Validators.minLength(3)]],
      modelYear: [
        new Date().getFullYear(),
        [Validators.required, Validators.minLength(4), Validators.maxLength(4), yearRange(2000, 2021)],
      ],
      categoryId: [0, Validators.required],
      brandId: [0, Validators.required],
      listPrice: [0, [Validators.required]],
    });

    this.route.parent.data.subscribe((data) => {
      const { error, product } = data.resolvedData;
      this.errorMessage = error;

      this.product = product;
      this.onProductRetrieved();
      this.changeDetector.detectChanges();
    });
  }

  onProductRetrieved(): void {
    const { product } = this;

    this.productForm.reset();
    this.productForm.patchValue(product);
  }

  saveChanges(): void {
    if (this.productForm.valid) {
      const product = { ...this.product, ...this.productForm.value };

      if (product.productId === 0) {
        this.addProduct(product);
      } else {
        this.updateProduct(product);
      }
    }
  }

  updateProduct(product: IProduct): void {
    this.productService.updateProduct(product).subscribe(
      (data: IApiResponse) => {
        console.log(`${data}.`);
      },
      (err: any) => {
        this.errorMessage = err;
        this.growlerService.dangerGrowl(this.errorMessage);
      },
      () => {
        this.afterProductUpdated(product);
      }
    );
  }

  addProduct(product: IProduct): void {
    this.productService.addProduct(product).subscribe(
      (data: IProduct) => {
        // Redirect the user to the newly created product page
        this.growlerService.successGrowl(`${data.productName} Created.`);
        this.productForm.markAllAsTouched();
        this.productForm.markAsPristine();
        this.router.navigate(['product', data.productId, 'edit']);
      },
      (err: any) => {
        this.errorMessage = err;
        this.growlerService.dangerGrowl(this.errorMessage);
      }
    );
  }

  deleteProduct(): void {
    this.productService.deleteProduct(this.product.productId).subscribe(
      (data: IApiResponse) => {
        console.log('Deleted', data);
        this.growlerService.successGrowl(`${this.product.productName} Deleted`);
      },
      (err: string) => {
        this.errorMessage = err;
        this.growlerService.dangerGrowl(this.errorMessage);
      },
      () => {
        if (!this.errorMessage) {
          this.router.navigate(['/products', 'list', 'all']);
        }
      }
    );
  }

  private afterProductUpdated(product: IProduct): void {
    if (this.errorMessage) {
      this.growlerService.growl(`Error updating ${product.productName}`, GrowlerMessageType.Danger);
    } else {
      this.growlerService.successGrowl(`${product.productName} Updated`);

      if (this.redirectToListAfterSave) {
        this.router.navigate(['/products', 'list', 'all']);
      }
    }
  }

  saveChangesAndRedirectToList(): void {
    this.redirectToListAfterSave = true;
  }
}
