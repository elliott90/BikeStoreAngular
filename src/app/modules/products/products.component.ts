import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  productCount$: Observable<number>;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productCount$ = this.productService.getTotalProductsCount();
  }
}
