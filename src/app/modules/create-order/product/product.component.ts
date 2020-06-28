import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit {
  @Input()
  form: FormGroup;

  @Input()
  product: AbstractControl;

  @Input()
  productIndex: number;

  @Output() removeProduct: EventEmitter<number> = new EventEmitter();

  get productName(): string {
    return this.product.get('productName').value;
  }

  get productPrice(): string {
    return this.product.get('listPrice').value;
  }

  get productPriceAfterDiscounts(): string {
    return this.product.get('price').value;
  }

  constructor() {}

  ngOnInit(): void {}

  remove(): void {
    this.removeProduct.emit(this.productIndex);
  }
}
