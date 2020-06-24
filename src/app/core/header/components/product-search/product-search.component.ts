import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { ProductService } from 'src/app/core/services/product.service';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/shared/interfaces/IProduct';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  providers: [CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductSearchComponent implements OnInit {
  searching = false;

  constructor(private router: Router, private productService: ProductService, private currencyPipe: CurrencyPipe) {}

  ngOnInit(): void {}

  productSearch = ($text$: Observable<string>): Observable<IProduct[]> =>
    $text$.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      tap(() => {
        this.searching = true;
      }),
      switchMap((term) => this.productService.getProductsBySearchString(term)),
      tap(() => {
        this.searching = false;
      })
    );

  productFormatter = (product: IProduct): string =>
    `${product.productName} (${this.currencyPipe.transform(product.listPrice, '£')})`;

  productInputFormatter = (product: IProduct): string => (product ? `` : '');

  selectProduct(event: NgbTypeaheadSelectItemEvent): void {
    const product = event.item as IProduct;

    this.router.navigate(['product', product.productId, 'edit'], { replaceUrl: true });
  }
}
