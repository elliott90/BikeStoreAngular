import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/interfaces/IProduct';
import { IStock } from 'src/app/shared/interfaces/IStock';
import { StockService } from 'src/app/core/services/stock.service';
import { StoreService } from 'src/app/core/services/store.service';
import { IStore } from 'src/app/shared/interfaces/IStore';

@Component({
  selector: 'app-product-stock',
  templateUrl: './product-stock.component.html',
})
export class ProductStockComponent implements OnInit {
  stockForm: FormGroup;
  errorMessage: string;
  product: IProduct;
  stock: IStock[];
  stores: IStore[];
  selectedStore: IStore;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private stockService: StockService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.route.parent.data.subscribe((data) => {
      const { error, product } = data.resolvedData;
      this.errorMessage = error;

      this.product = product;
      this.loadStockForProduct();
    });

    this.storeService.getAllStores().subscribe((data: IStore[]) => {
      this.stores = data;
    });

    this.stockForm = this.fb.group({
      storeId: [0, Validators.required],
      productId: [0, Validators.required],
      quantity: [0],
    });
  }

  loadStockForProduct(): void {
    this.stockService.getStockForProduct(this.product.productId).subscribe(
      (data: IStock[]) => {
        this.stock = data;
      },
      (err) => {
        this.errorMessage = err;
      }
    );
  }

  updateStockForm(stock: IStock): void {
    this.selectedStore = this.stores.find((x) => x.storeId === stock.storeId);
    this.stockForm.patchValue(stock);
  }

  saveStockForm(): void {
    console.log(this.stockForm.value);
    this.selectedStore = null;

    this.stockService
      .updateStockForProductAndStore(this.stockForm.value)
      .subscribe(() => this.loadStockForProduct(), null);
  }
}
