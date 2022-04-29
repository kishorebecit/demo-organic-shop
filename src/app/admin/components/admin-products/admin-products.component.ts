import { Product } from '../../../shared/models/product';
import { Observable, Subscription } from 'rxjs';
import { ProductService } from '../../../shared/services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  filteredProducts: Product[];
  subscription: Subscription;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().subscribe(products => this.filteredProducts = this.products = products);
   }

   ngOnInit(): void {
  }
  filter(query: string) {
    this.filteredProducts = query ? this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : this.products;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
