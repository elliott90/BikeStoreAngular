import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from '../interfaces/IProduct';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  @Input() products: IProduct[];

  constructor() {}

  ngOnInit(): void {}
}
