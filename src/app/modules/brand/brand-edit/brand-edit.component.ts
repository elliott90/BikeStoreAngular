import { Component, OnInit } from '@angular/core';
import { IBrand } from 'src/app/shared/interfaces/IBrand';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GrowlerService } from 'src/app/core/growler/growler.service';
import { BrandService } from 'src/app/core/services/brand.service';

@Component({
  selector: 'app-brand-edit',
  templateUrl: './brand-edit.component.html',
})
export class BrandEditComponent implements OnInit {
  brand: IBrand;
  brandForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private brandService: BrandService,
    private growlerService: GrowlerService,
    private fb: FormBuilder
  ) {}

  get isNewBrand(): boolean {
    return this.brandForm.get('brandId').value === 0;
  }

  ngOnInit(): void {
    this.brandForm = this.fb.group({
      brandId: [0],
      brandName: ['', Validators.required],
    });

    this.route.parent.paramMap.subscribe((params) => {
      this.loadBrand(+params.get('id'));
    });
  }

  loadBrand(brandId: number): void {
    this.brandService.getBrandById(brandId).subscribe((data: IBrand) => this.onBrandRetrieved(data));
  }

  onBrandRetrieved(brand: IBrand): void {
    this.brand = brand;
    this.brandForm.patchValue({
      brandId: brand.brandId,
      brandName: brand.brandName,
    });
  }

  saveChanges(): void {
    const brand: IBrand = { ...this.brand, ...this.brandForm.value };

    if (brand.brandId === 0) {
      this.createBrand(brand);
    } else {
      this.updateBrand(brand);
    }
  }

  updateBrand(brand: IBrand): void {
    this.brandService.updateBrand(brand).subscribe(() => {
      this.growlerService.successGrowl(`Updated ${brand.brandName}`);
      this.router.navigate(['brands', 'list']);
    });
  }

  createBrand(brand: IBrand): void {
    this.brandService.addBrand(brand).subscribe(() => {
      this.growlerService.successGrowl(`Added ${brand.brandName}`);
      this.router.navigate(['brands', 'list']);
    });
  }

  deleteBrand(): void {
    this.brandService.deleteBrand(this.brand).subscribe(() => {
      this.growlerService.successGrowl(`Deleted ${this.brand.brandName}`);
      this.router.navigate(['brands', 'list']);
    });
  }
}
