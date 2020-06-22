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
  productName: string;
  product: IProduct;
  errorMessage: string;

  get isNewProduct(): boolean {
    return this.product.productId === 0;
  }

  constructor(private route: ActivatedRoute, private productService: ProductService, private ref: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      const { resolvedData } = data;
      this.errorMessage = resolvedData.error;
      this.onProductRetrieved(resolvedData.product);
    });
  }

  onProductRetrieved(product: IProduct): void {
    this.product = product;

    if (!this.product) {
      this.productName = 'No product found';
    } else if (this.product.productId === 0) {
      this.productName = 'Add Product';
    } else {
      this.productName = `${this.product.productName}`;
    }
  }
}
