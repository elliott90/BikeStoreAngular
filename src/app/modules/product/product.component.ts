import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProduct } from '../../shared/interfaces/IProduct';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ProductComponent implements OnInit {
  product: IProduct;
  errorMessage: string;

  get isNewProduct(): boolean {
    return this.product ? this.product?.productId === 0 : true;
  }

  constructor(private route: ActivatedRoute, private productService: ProductService, private ref: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      const { error, product } = data.resolvedData;
      this.errorMessage = error;

      if (!error) {
        this.product = product;
      }
    });
  }
}
