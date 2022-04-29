import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { CategoryService } from '../../../shared/services/category.service';
import { Product } from '../../../shared/models/product';
import { Observable, Subscription } from 'rxjs';
import { ProductService } from '../../../shared/services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ShoppingCart } from '../../../shared/models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedCategory: string;
  cart$: Observable<ShoppingCart>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();

    this.populateProducts();
  }

  private populateProducts() {
    this.productService.getAll().pipe(
      switchMap(products => {
        this.products = products;
        return this.route.queryParamMap;
      })
    ).subscribe(params => {
      this.selectedCategory = params.get('category');
      this.applyFilter();
    });
  }

  private applyFilter() {
    this.filteredProducts = this.selectedCategory ?
            this.products?.filter(p => p.category === this.selectedCategory) : this.products;
  }

}
