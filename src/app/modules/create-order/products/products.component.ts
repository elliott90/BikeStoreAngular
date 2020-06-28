import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/shared/interfaces/IProduct';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyPipe } from '@angular/common';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CurrencyPipe],
})
export class ProductsComponent implements OnInit {
  @Input() fg: FormGroup;
  @Output() productAdded: EventEmitter<IProduct> = new EventEmitter();
  productSearchText = '';

  get productsFormArray(): FormArray {
    return <FormArray>this.fg.get('products');
  }

  constructor(private fb: FormBuilder, private currencyPipe: CurrencyPipe, private productService: ProductService) {}

  ngOnInit(): void {
    this.productsFormArray.valueChanges.subscribe((value: FormControl[]) => {
      this.recalculateProductPrice(value);
    });
  }

  // https://stackblitz.com/edit/angular-reactive-form-sobsoft?file=app%2Fapp.component.ts
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  recalculateProductPrice(products: any): void {
    const control = <FormArray>this.fg.controls.products;

    // eslint-disable-next-line guard-for-in
    for (const product in products) {
      const discountPercent = products[product].discount / 100;
      const discountValue = products[product].quantity * (products[product].listPrice * discountPercent);
      const totalProductPrice = products[product].quantity * products[product].listPrice - discountValue;

      control
        .at(+product)
        .get('price')
        .setValue(totalProductPrice, { onlySelf: true, emitEvent: false });
    }
  }

  productSearch = ($text$: Observable<string>): Observable<IProduct[]> =>
    $text$.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      // tap(() => this.searching = true),
      switchMap((term) => this.productService.getProductsBySearchString(term))
      // tap(() => this.searching = false)
    );

  productFormatter = (product: IProduct): string =>
    `${product.productName} (${this.currencyPipe.transform(product.listPrice, '£')})`;

  productInputFormatter = (product: IProduct): string => (product ? `${product.productName}` : '');

  selectProduct(event: NgbTypeaheadSelectItemEvent): void {
    const product = event.item as IProduct;

    this.productAdded.emit(product);

    setTimeout(() => {
      this.productSearchText = '';
    }, 200);
  }

  removeProduct(index: number): void {
    this.productsFormArray.removeAt(index);
  }
}
